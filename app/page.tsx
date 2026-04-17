import Header from "./components/header"
import Hero from "./components/hero"
import About from "./components/about"
import Stats from "./components/stats"
import Speakers from "./components/speakers"
import Participate from "./components/participate"
import Benefits from "./components/benefits"
import Programs from "./components/programs"
import Partners from "./components/partners"
import Footer from "./components/footer"


export default function Home() {
  return (
    <div className="main">
      <Header />
      <Hero />
      <About />
      <Stats />
      <Speakers />
      <Programs />
      <Participate />
      <Benefits />
      <Partners />
      <Footer />
    </div>
  )
}
