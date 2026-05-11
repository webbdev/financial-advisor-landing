import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  BOOKING_CONFIG,
  buildMonthGrid,
  formatLongDate,
  formatMonth,
  getSlotsForDate,
  type CalendarDay,
  type TimeSlot,
} from '../lib/booking'

type FormData = {
  name: string
  email: string
  phone: string
  topic: string
  notes: string
}

type Step = 'date' | 'time' | 'form' | 'confirmed'

const TOPICS = [
  'General financial advice',
  'Wealth management',
  'Tax planning',
  'Savings and investments',
  'Estate planning',
  'Business advisory',
  'Other',
] as const

const TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] } as const

export default function BookCallPage() {
  const reduce = useReducedMotion()

  // Anchor date for the calendar grid. Stepping prev/next moves this by a month.
  const [monthAnchor, setMonthAnchor] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    topic: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  )

  const step: Step = !selectedDate
    ? 'date'
    : !selectedSlot
      ? 'time'
      : 'form'

  const [submitted, setSubmitted] = useState(false)
  const currentStep: Step = submitted ? 'confirmed' : step

  // Memoised — building 42 cells on every keystroke would be wasteful.
  const calendarDays = useMemo(
    () => buildMonthGrid(monthAnchor),
    [monthAnchor],
  )
  const slots = useMemo(
    () => (selectedDate ? getSlotsForDate(selectedDate) : []),
    [selectedDate],
  )

  // Disable the prev arrow when looking at the current month.
  const today = new Date()
  const canGoBack =
    monthAnchor.getFullYear() > today.getFullYear() ||
    (monthAnchor.getFullYear() === today.getFullYear() &&
      monthAnchor.getMonth() > today.getMonth())

  // Disable next when there are no bookable days in the next month.
  const lastBookable = new Date()
  lastBookable.setDate(lastBookable.getDate() + BOOKING_CONFIG.daysAhead)
  const canGoForward =
    monthAnchor.getFullYear() < lastBookable.getFullYear() ||
    (monthAnchor.getFullYear() === lastBookable.getFullYear() &&
      monthAnchor.getMonth() < lastBookable.getMonth())

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) next.name = 'Please tell us your name'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = 'That email looks off'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    if (!form.topic) next.topic = 'Pick what you\u2019d like to discuss'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // No backend wired up yet — just flip to confirmation.
    // When you wire up Formspree/EmailJS/etc, fetch() goes here.
    setSubmitted(true)
  }

  const reset = () => {
    setSelectedDate(null)
    setSelectedSlot(null)
    setSubmitted(false)
    setForm({ name: '', email: '', phone: '', topic: '', notes: '' })
    setErrors({})
  }

  // Scroll the confirmation card into view once the booking submits.
  // We put the ref on the card itself rather than the section, so the
  // page header and stepper stay visible above and the success message
  // lands cleanly under the navbar — no header re-shown above it.
  const confirmationRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!submitted || !confirmationRef.current) return
    const top =
      confirmationRef.current.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({
      top,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [submitted, reduce])

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="container-x">
        {/* Page header — always visible. The success-message scroll
            below targets the confirmation card directly, so the header
            and stepper remain in the page flow without the user
            seeing them when they land on the success state. */}
        <div className="mx-auto mb-12 max-w-[640px] text-center md:mb-16">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-[1px] uppercase no-underline transition-colors"
            style={{ color: 'var(--color-blue)' }}
          >
            ← Back to home
          </Link>
          <h1
            className="mb-4 font-normal leading-[1.1] tracking-[-1px]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--color-ink)',
            }}
          >
            Book a{' '}
            <span className="serif" style={{ color: 'var(--color-blue)' }}>
              consultation
            </span>
          </h1>
          <p
            className="mx-auto max-w-[480px] text-base leading-[1.65]"
            style={{ color: 'var(--color-muted)' }}
          >
            A 30-minute call, on us. No pitches, no pressure — just a chance
            to see if we&rsquo;re the right fit.
          </p>
        </div>

        {/* Stepper — circles truly centered with connectors filling the
            gaps between them. The previous flex-1 layout stretched each
            step item to equal width, which pushed circles to the left
            edge of their slot. Now circles are auto-width and the
            connector lines (`flex-1`) live BETWEEN them.

            Stays visible on the confirmation screen with all three
            steps marked complete — gives the user a clear "you finished
            the journey" moment. */}
        <div className="mb-10 flex justify-center">
          <div className="flex w-full max-w-[360px] items-center">
            {(['date', 'time', 'form'] as const).map((s, i) => {
              const stepIndex = ['date', 'time', 'form'].indexOf(currentStep)
              const isActive = i === stepIndex && !submitted
              // Once submitted, every step is "done" (all check marks).
              const isDone = submitted || i < stepIndex
              return (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-colors"
                    style={{
                      backgroundColor:
                        isActive || isDone
                          ? 'var(--color-navy)'
                          : 'var(--color-line-2)',
                      color:
                        isActive || isDone ? '#fff' : 'var(--color-muted)',
                    }}
                  >
                    {isDone ? '✓' : i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className="mx-2 h-px flex-1 transition-colors"
                      style={{
                        backgroundColor: isDone
                          ? 'var(--color-navy)'
                          : 'var(--color-line-2)',
                      }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step content — animated transitions between steps */}
        <div className="mx-auto max-w-[640px]">
          <AnimatePresence mode="wait">
            {currentStep === 'date' && (
              <motion.div
                key="date"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={TRANSITION}
              >
                <DatePicker
                  days={calendarDays}
                  monthLabel={formatMonth(monthAnchor)}
                  onPrev={() =>
                    setMonthAnchor(
                      new Date(
                        monthAnchor.getFullYear(),
                        monthAnchor.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  onNext={() =>
                    setMonthAnchor(
                      new Date(
                        monthAnchor.getFullYear(),
                        monthAnchor.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  canPrev={canGoBack}
                  canNext={canGoForward}
                  onPick={setSelectedDate}
                />
              </motion.div>
            )}

            {currentStep === 'time' && selectedDate && (
              <motion.div
                key="time"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={TRANSITION}
              >
                <TimeSlots
                  slots={slots}
                  date={selectedDate}
                  onPick={setSelectedSlot}
                  onBack={() => setSelectedDate(null)}
                />
              </motion.div>
            )}

            {currentStep === 'form' && selectedDate && selectedSlot && (
              <motion.div
                key="form"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={TRANSITION}
              >
                <BookingForm
                  date={selectedDate}
                  slot={selectedSlot}
                  form={form}
                  errors={errors}
                  onChange={(field, value) => {
                    setForm((f) => ({ ...f, [field]: value }))
                    if (errors[field])
                      setErrors((e) => ({ ...e, [field]: undefined }))
                  }}
                  onBack={() => setSelectedSlot(null)}
                  onSubmit={onSubmit}
                />
              </motion.div>
            )}

            {currentStep === 'confirmed' && selectedDate && selectedSlot && (
              <motion.div
                key="confirmed"
                ref={confirmationRef}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={TRANSITION}
              >
                <Confirmation
                  date={selectedDate}
                  slot={selectedSlot}
                  name={form.name}
                  email={form.email}
                  onReset={reset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────── Sub-components ─────────────────────── */

function DatePicker({
  days,
  monthLabel,
  onPrev,
  onNext,
  canPrev,
  canNext,
  onPick,
}: {
  days: CalendarDay[]
  monthLabel: string
  onPrev: () => void
  onNext: () => void
  canPrev: boolean
  canNext: boolean
  onPick: (d: Date) => void
}) {
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div
      className="rounded-lg border bg-white p-6 md:p-8"
      style={{ borderColor: 'var(--color-line)' }}
    >
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px]" style={{ color: 'var(--color-blue)' }}>
        Step 1
      </div>
      <h2
        className="mb-6 text-[22px] font-medium"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        Choose a date
      </h2>

      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            borderColor: 'var(--color-line)',
            color: 'var(--color-ink)',
          }}
        >
          ←
        </button>
        <div
          className="text-base font-semibold"
          style={{ color: 'var(--color-ink)' }}
        >
          {monthLabel}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Next month"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            borderColor: 'var(--color-line)',
            color: 'var(--color-ink)',
          }}
        >
          →
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {dayLabels.map((d) => (
          <div
            key={d}
            className="py-2 text-center text-[11px] font-semibold tracking-[0.5px]"
            style={{ color: 'var(--color-mute-2)' }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const label = day.date.getDate()
          // Out-of-month days render as faint placeholders so the grid stays stable
          if (!day.inMonth) {
            return (
              <div
                key={i}
                className="flex h-9 w-full items-center justify-center text-sm leading-[1] sm:h-10"
                style={{ color: 'var(--color-line)' }}
              >
                {label}
              </div>
            )
          }

          const disabled = !day.bookable
          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onPick(day.date)}
              aria-label={day.date.toDateString()}
              className="flex h-9 w-full cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed sm:h-10"
              style={{
                color: disabled
                  ? 'var(--color-line)'
                  : day.isToday
                    ? 'var(--color-blue)'
                    : 'var(--color-ink)',
                backgroundColor: day.isToday
                  ? 'var(--color-blue-soft)'
                  : 'transparent',
                fontWeight: day.isToday ? 600 : 500,
              }}
              onMouseEnter={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = 'var(--color-navy)'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled) {
                  e.currentTarget.style.backgroundColor = day.isToday
                    ? 'var(--color-blue-soft)'
                    : 'transparent'
                  e.currentTarget.style.color = day.isToday
                    ? 'var(--color-blue)'
                    : 'var(--color-ink)'
                }
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      <p
        className="mt-6 text-xs leading-[1.6]"
        style={{ color: 'var(--color-mute-2)' }}
      >
        Available weekdays only · Times shown in your local timezone
      </p>
    </div>
  )
}

function TimeSlots({
  slots,
  date,
  onPick,
  onBack,
}: {
  slots: TimeSlot[]
  date: Date
  onPick: (s: TimeSlot) => void
  onBack: () => void
}) {
  return (
    <div
      className="rounded-lg border bg-white p-6 md:p-8"
      style={{ borderColor: 'var(--color-line)' }}
    >
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px]" style={{ color: 'var(--color-blue)' }}>
        Step 2
      </div>
      <h2
        className="mb-1 text-[22px] font-medium"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        Pick a time
      </h2>
      <p
        className="mb-6 text-sm"
        style={{ color: 'var(--color-muted)' }}
      >
        {formatLongDate(date)}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={!slot.available}
            onClick={() => onPick(slot)}
            className="cursor-pointer rounded-md border py-3 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:line-through"
            style={{
              borderColor: 'var(--color-line)',
              color: 'var(--color-ink)',
            }}
            onMouseEnter={(e) => {
              if (slot.available) {
                e.currentTarget.style.borderColor = 'var(--color-navy)'
                e.currentTarget.style.backgroundColor = 'var(--color-navy)'
                e.currentTarget.style.color = '#fff'
              }
            }}
            onMouseLeave={(e) => {
              if (slot.available) {
                e.currentTarget.style.borderColor = 'var(--color-line)'
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-ink)'
              }
            }}
          >
            {slot.label}
          </button>
        ))}
      </div>

      {slots.every((s) => !s.available) && (
        <p
          className="mt-6 rounded-md p-4 text-sm"
          style={{
            backgroundColor: 'var(--color-blue-soft)',
            color: 'var(--color-navy)',
          }}
        >
          No slots left on this day. Try another date.
        </p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium transition-colors"
        style={{ color: 'var(--color-blue)' }}
      >
        ← Choose a different date
      </button>
    </div>
  )
}

function BookingForm({
  date,
  slot,
  form,
  errors,
  onChange,
  onBack,
  onSubmit,
}: {
  date: Date
  slot: TimeSlot
  form: FormData
  errors: Partial<Record<keyof FormData, string>>
  onChange: (field: keyof FormData, value: string) => void
  onBack: () => void
  onSubmit: (e: FormEvent) => void
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border bg-white p-6 md:p-8"
      style={{ borderColor: 'var(--color-line)' }}
      noValidate
    >
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[1.5px]" style={{ color: 'var(--color-blue)' }}>
        Step 3
      </div>
      <h2
        className="mb-1 text-[22px] font-medium"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-ink)' }}
      >
        Your details
      </h2>

      {/* Booking summary card */}
      <div
        className="mb-6 mt-4 flex items-center gap-3 rounded-md p-3"
        style={{ backgroundColor: 'var(--color-blue-soft)' }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
          style={{ backgroundColor: 'var(--color-navy)', color: '#fff' }}
        >
          📅
        </div>
        <div className="flex-1 text-sm">
          <div className="font-semibold" style={{ color: 'var(--color-navy)' }}>
            {formatLongDate(date)}
          </div>
          <div style={{ color: 'var(--color-blue)' }}>
            {slot.label} · 30 minutes
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          required
          error={errors.name}
          input={
            <input
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                borderColor: errors.name
                  ? '#c0392b'
                  : 'var(--color-line)',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-blue)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.name
                  ? '#c0392b'
                  : 'var(--color-line)')
              }
            />
          }
        />
        <Field
          label="Email"
          required
          error={errors.email}
          input={
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                borderColor: errors.email
                  ? '#c0392b'
                  : 'var(--color-line)',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-blue)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.email
                  ? '#c0392b'
                  : 'var(--color-line)')
              }
            />
          }
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field
          label="Phone"
          required
          error={errors.phone}
          input={
            <input
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="+44 ..."
              className="w-full rounded-md border px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                borderColor: errors.phone
                  ? '#c0392b'
                  : 'var(--color-line)',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-blue)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.phone
                  ? '#c0392b'
                  : 'var(--color-line)')
              }
            />
          }
        />
        <Field
          label="What would you like to discuss?"
          required
          error={errors.topic}
          input={
            <select
              value={form.topic}
              onChange={(e) => onChange('topic', e.target.value)}
              className="w-full cursor-pointer rounded-md border bg-white px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                borderColor: errors.topic
                  ? '#c0392b'
                  : 'var(--color-line)',
                color: form.topic ? 'var(--color-ink)' : 'var(--color-mute-2)',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-blue)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.topic
                  ? '#c0392b'
                  : 'var(--color-line)')
              }
            >
              <option value="">Select a topic...</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          }
        />
      </div>

      <div className="mt-4">
        <Field
          label="Notes (optional)"
          input={
            <textarea
              value={form.notes}
              onChange={(e) => onChange('notes', e.target.value)}
              rows={4}
              placeholder="Anything specific you'd like us to prepare for?"
              className="w-full resize-y rounded-md border px-3 py-2.5 text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--color-line)' }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-blue)')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = 'var(--color-line)')
              }
            />
          }
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-px"
          style={{ backgroundColor: 'var(--color-navy)' }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              'var(--color-navy-deep)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'var(--color-navy)')
          }
        >
          <span>
            Confirm booking
          </span>
          <span
              aria-hidden
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-1.5 px-2 py-2.5 text-sm font-medium transition-colors"
          style={{ color: 'var(--color-blue)' }}
        >
          ← Pick a different time
        </button>
      </div>

      <p
        className="mt-5 text-xs leading-[1.6]"
        style={{ color: 'var(--color-mute-2)' }}
      >
        We&rsquo;ll send a confirmation email and a calendar invite within
        a few minutes. Your information is kept private and never shared.
      </p>
    </form>
  )
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string
  required?: boolean
  error?: string
  input: React.ReactNode
}) {
  return (
    <label className="block">
      <span
        className="mb-1.5 block text-[13px] font-medium"
        style={{ color: 'var(--color-ink)' }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-blue)' }}> *</span>
        )}
      </span>
      {input}
      {error && (
        <span
          className="mt-1 block text-xs"
          style={{ color: '#c0392b' }}
        >
          {error}
        </span>
      )}
    </label>
  )
}

function Confirmation({
  date,
  slot,
  name,
  email,
  onReset,
}: {
  date: Date
  slot: TimeSlot
  name: string
  email: string
  onReset: () => void
}) {
  return (
    <div
      className="rounded-lg border p-8 text-center md:p-10"
      style={{
        borderColor: 'var(--color-line)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white"
        style={{ backgroundColor: 'var(--color-success)' }}
        aria-hidden
      >
        ✓
      </div>
      <h2
        className="mb-3 font-normal leading-[1.15] tracking-[-0.5px]"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(28px, 3.5vw, 36px)',
          color: 'var(--color-ink)',
        }}
      >
        You&rsquo;re booked in,{' '}
        <span className="serif" style={{ color: 'var(--color-blue)' }}>
          {name.split(' ')[0]}
        </span>
      </h2>
      <p
        className="mx-auto mb-6 max-w-[420px] text-base leading-[1.65]"
        style={{ color: 'var(--color-muted)' }}
      >
        We&rsquo;ve sent a confirmation and calendar invite to{' '}
        <strong style={{ color: 'var(--color-ink)' }}>{email}</strong>.
      </p>

      <div
        className="mx-auto mb-7 max-w-[360px] rounded-md p-4 text-left"
        style={{ backgroundColor: 'var(--color-blue-soft)' }}
      >
        <div
          className="text-[11px] font-semibold uppercase tracking-[1px]"
          style={{ color: 'var(--color-blue)' }}
        >
          Your appointment
        </div>
        <div
          className="mt-2 font-semibold"
          style={{ color: 'var(--color-navy)' }}
        >
          {formatLongDate(date)}
        </div>
        <div
          className="text-sm"
          style={{ color: 'var(--color-blue)' }}
        >
          {slot.label} · 30 minutes
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium text-white no-underline transition-all hover:-translate-y-px"
          style={{ backgroundColor: 'var(--color-navy)' }}
        >
          Back to home
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border bg-transparent px-5 py-2.5 text-sm font-medium transition-colors"
          style={{
            borderColor: 'var(--color-line)',
            color: 'var(--color-ink)',
          }}
        >
          Book another
        </button>
      </div>
    </div>
  )
}