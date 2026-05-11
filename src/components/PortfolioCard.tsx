import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

const TARGET_VALUE = 487250
const TABS = ['1M', '6M', '1Y', 'All'] as const
type Tab = (typeof TABS)[number]

export function PortfolioCard() {
  const reduce = useReducedMotion()
  const [activeTab, setActiveTab] = useState<Tab>('1Y')
  const [displayValue, setDisplayValue] = useState(reduce ? TARGET_VALUE : 0)

  const rafRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    if (reduce) return
    const duration = 1600
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      // ease-out cubic — fast at start, slow at finish
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayValue(Math.round(TARGET_VALUE * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduce])

  return (
    <div
      className="hero-card relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg p-7 text-white"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(4, 44, 83, 0.45) 0%, rgba(4, 44, 83, 0.80) 60%, rgba(3, 32, 61, 0.95) 100%), url('https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 110%, rgba(3, 32, 61, 0.6), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          top: '-25%',
          right: '-15%',
          width: '55%',
          height: '55%',
          background:
            'radial-gradient(circle, rgba(133, 183, 235, 0.18), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div
          className="rounded-xl border px-4 py-3.5"
          style={{
            backgroundColor: 'rgba(11, 18, 32, 0.35)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <div
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.2px]"
            style={{ color: 'var(--color-blue-pale)' }}
          >
            <span
              aria-hidden
              className="inline-flex h-4 w-4 items-center justify-center rounded"
              style={{
                backgroundColor: 'rgba(191, 217, 242, 0.18)',
                color: 'var(--color-blue-pale)',
              }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 4 4 5-5" />
              </svg>
            </span>
            Portfolio overview
          </div>
          <div
            className="mt-1.5 text-[36px] font-medium leading-none tracking-[-1px] text-white"
            style={{
              fontFamily: 'var(--font-serif)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            £{displayValue.toLocaleString('en-GB')}
          </div>
          <div
            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium"
            style={{ color: '#4ADE80' }}
          >
            <span
              aria-hidden
              className="inline-flex h-[18px] w-[18px] items-center justify-center rounded"
              style={{ backgroundColor: 'rgba(74, 222, 128, 0.16)' }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
              </svg>
            </span>
            +12.4% this year
          </div>
        </div>

        <div
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-[5px] text-[10px] font-semibold tracking-[0.6px] text-white"
          style={{
            backgroundColor: 'rgba(11, 18, 32, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderColor: 'rgba(255, 255, 255, 0.18)',
          }}
        >
          <span
            aria-hidden
            className="pulse-dot block h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: '#4ADE80',
              boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)',
            }}
          />
          LIVE
        </div>
      </div>

      <div
        className="relative z-10 inline-flex self-start gap-0.5 rounded-full border p-[3px]"
        role="tablist"
        aria-label="Chart range"
        style={{
          backgroundColor: 'rgba(11, 18, 32, 0.4)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        {TABS.map((t) => {
          const active = t === activeTab
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(t)}
              className="cursor-pointer rounded-full border-0 px-3 py-[5px] text-[11px] font-medium transition-all"
              style={{
                backgroundColor: active
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'transparent',
                color: active ? 'var(--color-navy)' : 'var(--color-blue-pale)',
                boxShadow: active ? '0 1px 3px rgba(0, 0, 0, 0.15)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                if (!active)
                  e.currentTarget.style.color = 'var(--color-blue-pale)'
              }}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="relative z-10 -mx-1 my-2 shrink-0">
        <svg
          viewBox="0 0 280 90"
          preserveAspectRatio="none"
          aria-hidden
          className="block h-[90px] w-full overflow-visible"
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="chart-area"
            d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,25 L200,28 L220,18 L240,22 L260,12 L280,10 L280,90 L0,90 Z"
            fill="url(#chartGrad)"
          />
          <path
            className="chart-line"
            d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,25 L200,28 L220,18 L240,22 L260,12 L280,10"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="chart-point" cx="60" cy="50" r="3" fill="white" />
          <circle className="chart-point" cx="140" cy="30" r="3" fill="white" />
          <circle className="chart-point" cx="200" cy="28" r="3" fill="white" />
          <circle className="chart-point" cx="260" cy="12" r="3" fill="white" />
          <circle className="chart-endpoint-glow" cx="280" cy="10" r="6" fill="#FFFFFF" />
          <circle
            className="chart-endpoint"
            cx="280"
            cy="10"
            r="3.5"
            fill="white"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div
        className="relative z-10 flex flex-col gap-2.5 rounded-[10px] border px-4 py-3.5"
        style={{
          backgroundColor: 'rgba(11, 18, 32, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
        }}
      >
        <AllocRow name="Equities" pct={62} swatch="#BFD9F2" cls="equities" />
        <AllocRow name="Bonds" pct={28} swatch="#2674C0" cls="bonds" />
        <AllocRow name="Cash" pct={10} swatch="#4ADE80" cls="cash" />
      </div>
    </div>
  )
}

function AllocRow({
  name,
  pct,
  swatch,
  cls,
}: {
  name: string
  pct: number
  swatch: string
  cls: 'equities' | 'bonds' | 'cash'
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between text-[11px]">
        <span
          className="inline-flex items-center gap-1.5 font-medium tracking-[0.3px]"
          style={{ color: 'rgba(255, 255, 255, 0.85)' }}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-sm"
            style={{ backgroundColor: swatch }}
          />
          {name}
        </span>
        <span
          className="font-semibold text-white"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
      >
        <div className={`alloc-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}