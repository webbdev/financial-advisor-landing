import { Link } from 'react-router-dom'
import { ParallaxBand } from '../components/ParallaxBand'
import { Reveal } from '../components/Reveal'

export function CTA() {
  return (
    <ParallaxBand
      id="contact"
      className="py-26 md:py-36 text-center"
      imageUrl="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80"
      overlay="linear-gradient(rgba(4, 44, 83, 0.78), rgba(4, 44, 83, 0.88))"
    >
      <div className="mx-auto max-w-[640px] px-8">
        <Reveal>
          <h2
            className="mb-4 font-normal leading-[1.1] tracking-[-0.8px] text-white"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 5vw, 56px)',
            }}
          >
            Ready to start the{' '}
            <span className="serif" style={{ color: 'var(--color-blue-pale)' }}>
              conversation?
            </span>
          </h2>
          <p
            className="mx-auto mb-9 max-w-[480px] text-base leading-[1.65]"
            style={{ color: 'rgba(255,255,255,0.92)' }}
          >
            A 30-minute consultation, on us. No pitches, no pressure — just a
            chance to see if we're the right fit.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/book"
              className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium no-underline transition-all hover:-translate-y-px"
              style={{ color: 'var(--color-navy)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#F4F2EC')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#ffffff')
              }
            >
              <span>
                Book a free call
              </span>
              <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-md border bg-transparent px-5 py-2.5 text-sm font-medium text-white transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fff'
                e.currentTarget.style.backgroundColor =
                  'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Send a message
            </a>
          </div>
        </Reveal>
      </div>
    </ParallaxBand>
  )
}