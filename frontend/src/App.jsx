import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./pages/hero";
import Shop from "./pages/Shop";
import BestSellers from "./components/BestSellers";
import WhyStudentsChoose from "./components/WhyStudentsChoose";
import FaqSection from "./components/FaqSection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SellItem from "./pages/SellItem";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  return (
    <>
      <Hero />
      <BestSellers />
      <WhyStudentsChoose />
      <FaqSection />
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    // Disable lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDFBF0] flex flex-col font-sans text-slate-800 antialiased">

        {/* Navbar stays on every page */}
        <Navbar />

        <main className="flex-grow">

          <Routes>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Signup */}
            <Route path="/signup" element={<Signup />} />

            {/* Sell Item */}
            <Route path="/sell" element={<SellItem />} />

            {/* Sell Item */}
            <Route path="/profile" element={<Profile />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/wishlist" element={<Wishlist />}/>

          </Routes>

        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;