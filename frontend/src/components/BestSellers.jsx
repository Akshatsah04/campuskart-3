import React, { useEffect,useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BestSellerCard from "./BestSellerCard";

gsap.registerPlugin(ScrollTrigger);

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const getSpacing = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w >= 1280) return 270;
  if (w >= 1024) return 245;
  if (w >= 768) return 210;
  return Math.round(w * 0.65);
};

const getCardWidth = () => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  if (w >= 1280) return 290;
  if (w >= 1024) return 260;
  if (w >= 768) return 220;
  return Math.round(w * 0.72);
};

const CENTER_SCALE = 1.08;
const SIDE_1_SCALE = 0.90;
const SIDE_2_SCALE = 0.78;
const MIN_SCALE = 0.68;

const CENTER_OPACITY = 1;
const SIDE_1_OPACITY = 0.85;
const SIDE_2_OPACITY = 0.45;
const MIN_OPACITY = 0.15;

export default function BestSellers() {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const currentXRef = useRef(0);
  const startXRef = useRef(0);
  const startTrackXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const spacingRef = useRef(getSpacing());
  const activeIndexRef = useRef(2); 

  const [activeIndex, setActiveIndex] = useState(2);
  const [displaySpacing, setDisplaySpacing] = useState(getSpacing());
  const [displayCardWidth, setDisplayCardWidth] = useState(getCardWidth());

  const getCenterX = () => viewportRef.current?.clientWidth / 2 ?? 0;
  const getXForIndex = (idx, sp) => getCenterX() - idx * sp - sp / 2;

  const getBounds = (sp) => ({
    min: getXForIndex(featuredProducts.length - 1, sp),
    max: getXForIndex(0, sp),
  });

  const getScaleAt = (n) => {
    if (n <= 0) return CENTER_SCALE;
    if (n <= 1) return CENTER_SCALE + (SIDE_1_SCALE - CENTER_SCALE) * n;
    if (n <= 2) return SIDE_1_SCALE + (SIDE_2_SCALE - SIDE_1_SCALE) * (n - 1);
    return Math.max(MIN_SCALE, SIDE_2_SCALE + (MIN_SCALE - SIDE_2_SCALE) * (n - 2));
  };

  const getOpacityAt = (n) => {
    if (n <= 0) return CENTER_OPACITY;
    if (n <= 1) return CENTER_OPACITY + (SIDE_1_OPACITY - CENTER_OPACITY) * n;
    if (n <= 2) return SIDE_1_OPACITY + (SIDE_2_OPACITY - SIDE_1_OPACITY) * (n - 1);
    return Math.max(MIN_OPACITY, SIDE_2_OPACITY + (MIN_OPACITY - SIDE_2_OPACITY) * (n - 2));
  };

  const updateCards = (trackX, sp, animate = false) => {
    if (!trackRef.current || !viewportRef.current) return;
    const cx = getCenterX();
    const cards = Array.from(trackRef.current.querySelectorAll(".bsc-item"));

    let closestIdx = 0, minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = trackX + i * sp + sp / 2;
      const dist = Math.abs(cardCenter - cx);
      const normalized = dist / sp;

      const scale = getScaleAt(normalized);
      const opacity = getOpacityAt(normalized);
      const zIndex = Math.round(100 - normalized * 15);

      if (animate) {
        gsap.to(card, { scale, opacity, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      } else {
        gsap.set(card, { scale, opacity });
      }
      card.style.zIndex = zIndex;

      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    });

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx;
      setActiveIndex(closestIdx);
    }
  };

  const snapToCard = (idx, sp) => {
    if (!trackRef.current || !viewportRef.current) return;
    const targetIdx = Math.max(0, Math.min(featuredProducts.length - 1, idx));
    const targetX = getXForIndex(targetIdx, sp);

    activeIndexRef.current = targetIdx;
    setActiveIndex(targetIdx);

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
      onUpdate: () => {
        const x = Number(gsap.getProperty(trackRef.current, "x")) || targetX;
        currentXRef.current = x;
        updateCards(x, sp);
      },
      onComplete: () => {
        currentXRef.current = targetX;
        updateCards(targetX, sp, true);
      },
    });
  };

  const handlePrev = () => {
    snapToCard(activeIndexRef.current - 1, spacingRef.current);
  };

  const handleNext = () => {
    snapToCard(activeIndexRef.current + 1, spacingRef.current);
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/products/featured`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch products"
                );
            }

            setFeaturedProducts(data.products || []);
        } catch (err) {
            console.error("Error fetching featured products:", err);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    fetchFeaturedProducts();
}, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll(".bsc-item"));
      if (!cards.length) return;

      const sp = spacingRef.current;
      const initialX = getXForIndex(activeIndexRef.current, sp);
      currentXRef.current = initialX;
      gsap.set(track, { x: initialX });
      updateCards(initialX, sp);

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        }
      );

      const onDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startTrackXRef.current = currentXRef.current;
        gsap.killTweensOf(track);
        viewport.setPointerCapture(e.pointerId);
        viewport.style.cursor = "grabbing";
      };

      const onMove = (e) => {
        if (!isDraggingRef.current) return;
        const sp = spacingRef.current;
        const { min, max } = getBounds(sp);
        let newX = startTrackXRef.current + (e.clientX - startXRef.current);
        newX = gsap.utils.clamp(min - 50, max + 50, newX);
        currentXRef.current = newX;
        gsap.set(track, { x: newX });
        updateCards(newX, sp);
      };

      const onUp = (e) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        viewport.style.cursor = "grab";
        try {
          viewport.releasePointerCapture(e.pointerId);
        } catch {}

        const sp = spacingRef.current;
        const raw = (getCenterX() - sp / 2 - currentXRef.current) / sp;
        const idx = Math.max(0, Math.min(featuredProducts.length - 1, Math.round(raw)));
        snapToCard(idx, sp);
      };

      const onCancel = (e) => {
        if (isDraggingRef.current) onUp(e);
      };

      viewport.addEventListener("pointerdown", onDown);
      viewport.addEventListener("pointermove", onMove);
      viewport.addEventListener("pointerup", onUp);
      viewport.addEventListener("pointercancel", onCancel);

      const onResize = () => {
        const sp = getSpacing();
        const cw = getCardWidth();
        spacingRef.current = sp;
        setDisplaySpacing(sp);
        setDisplayCardWidth(cw);

        const newX = getXForIndex(activeIndexRef.current, sp);
        currentXRef.current = newX;
        gsap.set(track, { x: newX });
        updateCards(newX, sp);
      };

      window.addEventListener("resize", onResize);
      viewport.style.cursor = "grab";

      return () => {
        viewport.removeEventListener("pointerdown", onDown);
        viewport.removeEventListener("pointermove", onMove);
        viewport.removeEventListener("pointerup", onUp);
        viewport.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("resize", onResize);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FFFDF2] py-20 px-4 sm:px-6 lg:px-8 border-t border-[#EBE6CE]/60"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header Section */}
        <div ref={headingRef} className="relative z-20 mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-emerald-600">
            OUR COLLECTION
          </p>

          <h2 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Featured Products
          </h2>

          <p className="mt-3 text-sm sm:text-base font-medium text-slate-500">
            Explore our most popular items loved by customers
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-6 lg:left-12 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#EBE6CE] bg-white/95 text-slate-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === featuredProducts.length - 1}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-6 lg:right-12 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#EBE6CE] bg-white/95 text-slate-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900 disabled:opacity-30 disabled:hover:scale-100 cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>

          {/* Viewport & Track */}
          <div
            ref={viewportRef}
            className="relative mx-auto h-[530px] sm:h-[570px] w-full touch-none select-none overflow-hidden"
          >
            {/* Soft Side Vignette Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[12%] bg-gradient-to-r from-[#FFFDF2] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[12%] bg-gradient-to-l from-[#FFFDF2] to-transparent" />

            {/* Track */}
            <div
              ref={trackRef}
              className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center will-change-transform"
            >
              {featuredProducts.map((product, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={product.id}
                    className="bsc-item relative shrink-0 transition-all duration-300"
                    style={{ width: `${displaySpacing}px` }}
                    onClick={() => snapToCard(index, spacingRef.current)}
                  >
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ width: `${displayCardWidth}px` }}
                    >
                      <BestSellerCard product={product} isActive={isActive} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {featuredProducts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => snapToCard(i, spacingRef.current)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? "w-8 bg-emerald-600"
                  : "w-3 bg-[#DCD6B8] hover:bg-emerald-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}