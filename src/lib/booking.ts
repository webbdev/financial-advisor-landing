/**
 * Booking config and date utilities.
 *
 * Keep all "what slots are available" logic here so changing your
 * working hours or slot length is a one-file edit. Nothing in
 * BookCallPage hardcodes times — it asks this module.
 */

export const BOOKING_CONFIG = {
  /** Working days: 1=Mon, 2=Tue, ..., 5=Fri (matches Date.getDay() codes). */
  workingDays: [1, 2, 3, 4, 5] as const,
  /** Inclusive start hour, exclusive end hour (24h clock). */
  startHour: 9,
  endHour: 17,
  /** Slot length in minutes. */
  slotMinutes: 30,
  /** How many days into the future to allow booking. */
  daysAhead: 21,
  /** Earliest booking — same-day requires this many hours of notice. */
  minNoticeHours: 4,
}

export type TimeSlot = {
  /** ISO-ish string like "09:30" used as React key. */
  id: string
  /** Display label, e.g. "9:30 AM". */
  label: string
  /** Full Date object for this slot. */
  date: Date
  /** Whether this slot is bookable. Some are pre-marked unavailable for realism. */
  available: boolean
}

export type CalendarDay = {
  date: Date
  /** First-of-month padding cells render as null in the grid. */
  inMonth: boolean
  isToday: boolean
  isPast: boolean
  isWorkingDay: boolean
  /** A day is "bookable" if it's a working day, not in the past, and within the lookahead window. */
  bookable: boolean
}

/* ────── helpers ────── */

const startOfDay = (d: Date) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

/**
 * Build the calendar grid for the month containing `anchor`.
 * Returns 6 weeks × 7 days = 42 cells, padded with previous/next-month dates
 * so the grid is always rectangular.
 */
export function buildMonthGrid(anchor: Date): CalendarDay[] {
  const today = startOfDay(new Date())
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + BOOKING_CONFIG.daysAhead)

  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1)

  // Find the Monday of the week containing the 1st. (Most calendars start
  // Monday in the UK; flip these two lines if you prefer Sunday-start.)
  const dayOfWeek = firstOfMonth.getDay() // 0=Sun
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const gridStart = new Date(firstOfMonth)
  gridStart.setDate(gridStart.getDate() + mondayOffset)

  const days: CalendarDay[] = []
  for (let i = 0; i < 42; i++) {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + i)

    const inMonth = date.getMonth() === anchor.getMonth()
    const isPast = date < today
    const isWorkingDay = BOOKING_CONFIG.workingDays.includes(
      date.getDay() as 1 | 2 | 3 | 4 | 5,
    )
    const withinWindow = date >= today && date <= maxDate

    days.push({
      date,
      inMonth,
      isToday: date.getTime() === today.getTime(),
      isPast,
      isWorkingDay,
      bookable: inMonth && isWorkingDay && !isPast && withinWindow,
    })
  }
  return days
}

/**
 * Return the list of time slots for a given date. Some slots are marked
 * as unavailable based on a deterministic hash of the date string, so the
 * UI looks realistic without a backend (and without re-rolling on every
 * render, which would jitter).
 */
export function getSlotsForDate(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = []
  const { startHour, endHour, slotMinutes } = BOOKING_CONFIG
  const totalMinutes = (endHour - startHour) * 60
  const slotCount = totalMinutes / slotMinutes

  // Same-day cutoff
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setHours(now.getHours() + BOOKING_CONFIG.minNoticeHours)

  // Stable per-date hash for "looks unavailable" pattern
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const hash = [...dateKey].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0)

  for (let i = 0; i < slotCount; i++) {
    const slotDate = new Date(date)
    const minutes = startHour * 60 + i * slotMinutes
    slotDate.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)

    // ~25% of slots appear taken — varies per day via the hash
    const taken = ((hash + i * 7) % 4 === 0)
    const beforeCutoff = slotDate < cutoff

    const hh = slotDate.getHours()
    const mm = slotDate.getMinutes().toString().padStart(2, '0')
    const ampm = hh >= 12 ? 'PM' : 'AM'
    const display = ((hh + 11) % 12) + 1

    slots.push({
      id: `${hh}:${mm}`,
      label: `${display}:${mm} ${ampm}`,
      date: slotDate,
      available: !taken && !beforeCutoff,
    })
  }
  return slots
}

export function formatLongDate(d: Date): string {
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatMonth(d: Date): string {
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}