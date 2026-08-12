import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BestSellerCard from "./BestSellerCard";

gsap.registerPlugin(ScrollTrigger);

const bestSellers = [
  {
    id: 1,
    name: "MacBook Pro M1 (16GB/512GB SSD)",
    price: "₹54,999",
    rating: 4.9,
    image: "/categories/electronics.PNG",
    category: "Electronics",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    name: "Ergonomic Mesh Study Chair",
    price: "₹3,499",
    rating: 4.7,
    image: "/categories/furniture.PNG",
    category: "Furniture",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    name: "HC Verma Physics Concepts Vol 1 & 2",
    price: "₹450",
    rating: 4.8,
    image: "/categories/textbooks.PNG",
    category: "Textbooks",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    name: "Unisex Levi's Denim Jacket",
    price: "₹1,299",
    rating: 4.6,
    image: "/categories/clothing.PNG",
    category: "Clothing",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    id: 5,
    name: "Casio fx-991EX ClassWiz Calculator",
    price: "₹1,150",
    rating: 4.9,
    image: "/categories/stationary.PNG",
    category: "Stationary",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    id: 6,
    name: "Hero Sprint Single Speed Bicycle",
    price: "₹4,200",
    rating: 4.5,
    image: "/categories/others.PNG",
    category: "Others",
    gradient: "from-slate-600 to-zinc-700",
  },
  {
    id: 7,
    name: "Wireless Mechanical Keyboard",
    price: "₹2,499",
    rating: 4.7,
    image: "/categories/electronics.PNG",
    category: "Electronics",
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: 8,
    name: "Scientific Calculator",
    price: "₹899",
    rating: 4.6,
    image: "/categories/stationary.PNG",
    category: "Stationary",
    gradient: "from-pink-600 to-red-600",
  },
  {
    id: 9,
    name: "Study Table",
    price: "₹2,999",
    rating: 4.8,
    image: "/categories/furniture.PNG",
    category: "Furniture",
    gradient: "from-orange-500 to-yellow-600",
  },
  {
    id: 10,
    name: "Engineering Textbook Bundle",
    price: "₹750",
    rating: 4.7,
    image: "/categories/textbooks.PNG",
    category: "Textbooks",
    gradient: "from-green-600 to-emerald-700",
  },
];

// ─────────────────────────────────────────────────────────
// Spacing = gap between card CENTERS in the track
// Card width = visual card width (smaller than spacing so cards overlap a little)
//
// Goal: show 5 cards at once — 2 left, 1 center, 2 right
// viewport width ≈ spacing * 4   (2 gaps each side of center)
//
// Desktop 1440px → spacing ~240px, cardWidth ~220px
// Tablet  768px  → spacing ~195px, cardWidth ~180px
// Mobile  375px  → spacing ~145px, cardWidth ~130px (shows ~2.5 each side)
// ─────────────────────────────────────────────────────────
const getSpacing = () => {
  const w = window.innerWidth;
  if (w >= 1280) return 255;
  if (w >= 1024) return 235;
  if (w >= 768)  return 200;
  return Math.round(w * 0.42);          // mobile: ~157px @ 375
};

const getCardWidth = () => {
  const w = window.innerWidth;
  if (w >= 1280) return 230;
  if (w >= 1024) return 212;
  if (w >= 768)  return 182;
  return Math.round(w * 0.38);          // mobile: ~142px @ 375
};

const CENTER_SCALE   = 1.15;
const SIDE_1_SCALE   = 0.88;  // immediately adjacent (±1)
const SIDE_2_SCALE   = 0.74;  // outer cards          (±2)
const MIN_SCALE      = 0.65;

const CENTER_OPACITY = 1;
const SIDE_1_OPACITY = 0.55;
const SIDE_2_OPACITY = 0.22;
const MIN_OPACITY    = 0.10;

export default function BestSellers() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const viewportRef = useRef(null);
  const trackRef    = useRef(null);

  const currentXRef       = useRef(0);
  const startXRef         = useRef(0);
  const startTrackXRef    = useRef(0);
  const isDraggingRef     = useRef(false);
  const spacingRef        = useRef(getSpacing());
  const activeIndexRef    = useRef(Math.floor(bestSellers.length / 2));

  const [activeIndex, setActiveIndex] = useState(Math.floor(bestSellers.length / 2));
  const [displaySpacing, setDisplaySpacing] = useState(getSpacing());
  const [displayCardWidth, setDisplayCardWidth] = useState(getCardWidth());

  // ───────────────── helpers ─────────────────────────────
  const getCenterX  = () => viewportRef.current?.clientWidth / 2 ?? 0;

  // Card visual center = trackX + idx*sp + sp/2
  // Solve for trackX when that equals getCenterX():
  //   trackX = getCenterX() - idx*sp - sp/2
  const getXForIndex = (idx, sp) => getCenterX() - idx * sp - sp / 2;

  const getBounds = (sp) => ({
    min: getXForIndex(bestSellers.length - 1, sp),
    max: getXForIndex(0, sp),
  });

  // Map normalized distance (0=center, 1=±1 card, 2=±2 cards…)
  // to scale / opacity using piecewise linear interpolation
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

  // ───────────────── updateCards ─────────────────────────
  const updateCards = (trackX, sp, animate = false) => {
    if (!trackRef.current || !viewportRef.current) return;
    const cx    = getCenterX();
    const cards = Array.from(trackRef.current.querySelectorAll(".bsc-item"));

    let closestIdx = 0, minDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = trackX + i * sp + sp / 2; // absolute position of card center (slot left + half slot width)
      const dist       = Math.abs(cardCenter - cx);
      const normalized = dist / sp;                // 0 = on center, 1 = one card away, …

      const scale   = getScaleAt(normalized);
      const opacity = getOpacityAt(normalized);
      const zIndex  = Math.round(100 - normalized * 15);

      if (animate) {
        gsap.to(card, { scale, opacity, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      } else {
        gsap.set(card, { scale, opacity, zIndex });
      }
      card.style.zIndex = zIndex;

      if (dist < minDist) { minDist = dist; closestIdx = i; }
    });

    if (closestIdx !== activeIndexRef.current) {
      activeIndexRef.current = closestIdx;
      setActiveIndex(closestIdx);
    }
  };

  // ───────────────── snapToCard ──────────────────────────
  const snapToCard = (idx, sp) => {
    if (!trackRef.current || !viewportRef.current) return;
    const targetX = getXForIndex(idx, sp);

    activeIndexRef.current = idx;
    setActiveIndex(idx);

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

  // ───────────────── GSAP / pointer effects ──────────────
  useLayoutEffect(() => {
    const section  = sectionRef.current;
    const viewport = viewportRef.current;
    const track    = trackRef.current;
    if (!section || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(track.querySelectorAll(".bsc-item"));
      if (!cards.length) return;

      const sp = spacingRef.current;

      // Initial position — start on middle card
      const initialX = getXForIndex(activeIndexRef.current, sp);
      currentXRef.current = initialX;
      gsap.set(track, { x: initialX });
      updateCards(initialX, sp);

      // Entrance animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%", once: true } }
      );
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.04, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
          onComplete: () => updateCards(currentXRef.current, spacingRef.current) }
      );

      // ── Pointer drag ────────────────────────────────────
      const onDown = (e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.preventDefault();
        isDraggingRef.current = true;
        startXRef.current      = e.clientX;
        startTrackXRef.current = currentXRef.current;
        gsap.killTweensOf(track);
        viewport.setPointerCapture(e.pointerId);
        viewport.style.cursor = "grabbing";
      };

      const onMove = (e) => {
        if (!isDraggingRef.current) return;
        const sp  = spacingRef.current;
        const { min, max } = getBounds(sp);
        let newX  = startTrackXRef.current + (e.clientX - startXRef.current);
        newX      = gsap.utils.clamp(min, max, newX);
        currentXRef.current = newX;
        gsap.set(track, { x: newX });
        updateCards(newX, sp);
      };

      const onUp = (e) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        viewport.style.cursor = "grab";
        try { viewport.releasePointerCapture(e.pointerId); } catch { /* ok */ }

        const sp  = spacingRef.current;
        // Inverse of getXForIndex: idx = (getCenterX() - sp/2 - trackX) / sp
        const raw = (getCenterX() - sp / 2 - currentXRef.current) / sp;
        const idx = Math.max(0, Math.min(bestSellers.length - 1, Math.round(raw)));
        snapToCard(idx, sp);
      };

      const onCancel = (e) => { if (isDraggingRef.current) onUp(e); };

      viewport.addEventListener("pointerdown",   onDown);
      viewport.addEventListener("pointermove",   onMove);
      viewport.addEventListener("pointerup",     onUp);
      viewport.addEventListener("pointercancel", onCancel);

      // ── Resize ──────────────────────────────────────────
      const onResize = () => {
        const sp  = getSpacing();
        const cw  = getCardWidth();
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
        viewport.removeEventListener("pointerdown",   onDown);
        viewport.removeEventListener("pointermove",   onMove);
        viewport.removeEventListener("pointerup",     onUp);
        viewport.removeEventListener("pointercancel", onCancel);
        window.removeEventListener("resize",          onResize);
      };
    }, section);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(16,185,129,0.07),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

        {/* ── Heading ─────────────────────────────────── */}
        <div ref={headingRef} className="relative z-20 mx-auto max-w-2xl text-center">
          <h2 className="mt-4 select-none text-5xl font-black leading-[0.95] tracking-[-0.05em] text-slate-900 sm:mt-5 sm:text-6xl md:text-7xl lg:text-8xl">
            Best Sellers
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm font-medium leading-relaxed text-slate-500 sm:text-base md:text-lg">
            Discover the products students are buying, selling and recommending the most.
          </p>
        </div>

        {/* ── Carousel ────────────────────────────────── */}
        <div
          ref={viewportRef}
          className="relative mx-auto h-[400px] w-full touch-none select-none overflow-hidden md:h-[480px] lg:h-[520px]"
        >
          {/* Left / right edge vignette fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[15%] bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[15%] bg-gradient-to-l from-white to-transparent" />

          {/* Track — positioned so card centers sit at index * spacing */}
          <div
            ref={trackRef}
            className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center will-change-transform"
          >
            {bestSellers.map((product, index) => (
              // Each slot is spacing-wide; the visible card lives centered inside it
              <div
                key={product.id}
                className="bsc-item relative shrink-0"
                style={{ width: `${displaySpacing}px`, height: "360px" }}
                onClick={() => snapToCard(index, spacingRef.current)}
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ width: `${displayCardWidth}px` }}
                >
                  <BestSellerCard product={product} />
                </div>
              </div>
            ))}
          </div>

          {/* Drag hint */}
          <p className="pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 sm:text-[10px]">
            Drag or click to explore
          </p>
        </div>

        {/* ── Active product info + dots ───────────────── */}
        <div className="relative z-20 mt-6 flex flex-col items-center gap-3">
          {/* Counter pill */}
          <p className="rounded-full border border-emerald-100/50 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            {activeIndex + 1} / {bestSellers.length}
          </p>

          {/* Active product name */}
          <p className="max-w-xs text-center text-sm font-extrabold text-slate-800 sm:text-base">
            {bestSellers[activeIndex].name}
          </p>
          <p className="text-base font-black text-slate-900">
            {bestSellers[activeIndex].price}
            <span className="ml-2 text-xs font-bold text-amber-500">★ {bestSellers[activeIndex].rating}</span>
          </p>

          {/* Dot strip */}
          <div className="flex items-center gap-1.5">
            {bestSellers.map((p, i) => (
              <button
                key={p.id}
                onClick={() => snapToCard(i, spacingRef.current)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-emerald-500"
                    : "w-1.5 bg-slate-200 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}