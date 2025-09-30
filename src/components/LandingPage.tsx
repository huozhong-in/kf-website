import { Header } from './Header'
import { Hero } from './Hero'
import { Features } from './Features'
import { Pricing } from './Pricing'
import { Footer } from './Footer'

export const LandingPage = () => {
  return (
    <>
      <canvas id="bg-canvas"></canvas>
      <div className="content">
        <Header />
        <Hero />
        <Features />
        <Pricing />
        <Footer />
      </div>
    </>
  )
}