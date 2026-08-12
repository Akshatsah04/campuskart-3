import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Hero from './pages/hero'
import BestSellers from './components/BestSellers'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    })

    // Synchronize ScrollTrigger with Lenis updates
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis update handler to GSAP ticker
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)

    // Disable lag smoothing for optimal synchronization
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800 antialiased">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BestSellers />
      </main>
    </div>
  )
}

export default App
