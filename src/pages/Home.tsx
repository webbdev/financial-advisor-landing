import { Hero } from "../sections/Hero"
import { TrustBar } from "../sections/TrustBar"
import { QuoteBand } from "../sections/QuoteBand"
import { About } from "../sections/About"
import { Services } from "../sections/Services"
import { StatsBand } from "../sections/StatsBand"
import { Process } from "../sections/Process"
import { Philosophy } from "../sections/Philosophy"
import { Testimonials } from "../sections/Testimonials"
import { CTA } from "../sections/CTA"

const Home = () => {
  return (
	<>
		<Hero />
		<TrustBar />
		<QuoteBand />
		<About />
		<Services />
		<StatsBand />
		<Process />
		<Philosophy />
		<Testimonials />
		<CTA />
	</>
  )
}

export default Home