import Header from "./components/header"  
import Hero from "./components/hero"
import About from "./components/about"
import Stats from "./components/stats"
import Participate from "./components/participate" 
import Benefits from "./components/benefits"

export default function Home() {
  return (
    <div className="main">
       <Header />
       <Hero />
       <About />
       <Stats />
       <Participate />
       <Benefits />
    </div>
    
  )
}
