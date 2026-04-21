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
import Organizers from "./components/organizers"


export default function Home() {
  return (
    <div className="main dark:bg-slate-900">
      <Header />
      <Hero />
      <About />
      <Stats />
      <Organizers />
          <Participate />
       <Benefits />
      <Speakers />
      <Partners />
       <Programs />
      <Footer />
    </div>
  )
}
