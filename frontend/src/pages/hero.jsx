import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const pinnedSectionRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Clothing",
      gradient: "from-[#8B5CF6] to-[#6366F1]", // Purple to Indigo
      image:"/categories/clothing.PNG",
    },
    {
      id: 2,
      title: "Electronics",
      gradient: "from-[#06B6D4] to-[#3B82F6]", // Cyan to Blue
      tag: {
        text: "@coplin",
        color: "bg-[#2563EB]", // Blue tag
        arrowColor: "border-t-[#2563EB]",
        animation: "animate-float"
      },
      image:"/categories/electronics.PNG",
    },
    {
      id: 3,
      title: "Furniture",
      gradient: "from-[#F59E0B] to-[#EF4444]", // Amber to Red
      image:"/categories/furniture.PNG",
    },
    {
      id: 4,
      title: "Stationary",
      gradient: "from-[#EC4899] to-[#F43F5E]", // Pink to Rose
      image:"/categories/stationary.PNG",
 
    },
    {
      id: 5,
      title: "Textbooks",
      gradient: "from-[#10B981] to-[#14B8A6]", // Emerald to Teal
      tag: {
        text: "@andrea",
        color: "bg-[#10B981]", // Green tag
        arrowColor: "border-t-[#10B981]",
        animation: "animate-float-delayed"
      },
      image:"/categories/textbooks.PNG",
    },
    {
      id: 6,
      title: "Others",
      gradient: "from-[#10B981] to-[#14B8A6]", // Emerald to Teal
      image:"/categories/others.PNG",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardsEl = gsap.utils.toArray('.hero-card');
      const tagsEl = gsap.utils.toArray('.hero-tag');
      const detailsEl = gsap.utils.toArray('.card-details');
      
      const heroHeaderEl = '.hero-header';
      const catalogHeaderEl = '.catalog-header';
      const catalogFooterEl = '.catalog-footer';

      const clusterOffsets = [110, 55, 0, -55, -110 , -165];
      const clusterOffsets2 = [-225, -135, -45, 45 , 135 , 225];
      const finalRotations = [-12, -6, -1, 4, 10 , 15];

      // 1. Initial State configuration (cards are hidden off-screen bottom)
      gsap.set(cardsEl, {
        y: 650,
        rotation: 0,
        x: (i) => clusterOffsets[i],
      });
      gsap.set(tagsEl, {
        opacity: 0,
        scale: 0,
      });
      gsap.set(heroHeaderEl, {
        opacity: 0,
        y: -40,
      });
      gsap.set(detailsEl, {
        opacity: 0,
        y: 20,
      });
      gsap.set(catalogHeaderEl, {
        opacity: 0,
        y: 60,
      });
      gsap.set(catalogFooterEl, {
        opacity: 0,
        y: 35,
      });

      // 2. ScrollTrigger setup (triggered once entrance completes)
      const initScrollTrigger = () => {
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        scrollTimeline
          // Step A: Fade out speech tags and slide out the main Hero header group
          .to(tagsEl, {
            opacity: 0,
            scale: 0.3,
            duration: 0.3,
          })
          .to(heroHeaderEl, {
            opacity: 0,
            y: -80,
            duration: 0.5,
            ease: 'power1.inOut',
          }, '-=0.2')
          // Step B: Straighten cards (rotation 0) and slide them apart (x 0)
          .to(cardsEl, {
            x: (i) => clusterOffsets2[i],
            rotation: 0,
            duration: 0.7,
            scale:1.1,
            ease: 'power2.inOut',
          }, '-=0.2')
          // Step C: Fade and slide in the Catalog Header ("Best Selling Campus Items")
          .to(catalogHeaderEl, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.3')
          // Step D: Fade in product ratings & price details under each card
          .to(detailsEl, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
          }, '-=0.2')
          // Step E: Reveal bottom footer catalog action CTA
          .to(catalogFooterEl, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, '-=0.2');
      };

      // 3. Play the page load entrance animation
      const entranceTimeline = gsap.timeline({
        onComplete: initScrollTrigger
      });

      entranceTimeline
        // Cards rise together from the bottom
        .to(cardsEl, {
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.05,
        })
        // Cards fan out horizontally and tilt into final rotations
        .to(cardsEl, {
          x: 0,
          rotation: (i) => finalRotations[i],
          duration: 1.0,
          ease: 'back.out(1.4)',
        }, '-=0.6')
        // User tags pop in
        .to(tagsEl, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.8)',
          stagger: 0.12,
        }, '-=0.55')
        // Main Hero header slides down
        .to(heroHeaderEl, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.95');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
<>
    <div 
      ref={containerRef}
      className="relative bg-[#FAFAF9]"
    >
      {/* Pinned Viewport Section */}
      <section 
        ref={pinnedSectionRef}
        className="hero-pinned-section sticky top-[72px] z-10 w-full h-[calc(100vh-72px)] flex flex-col items-center justify-between px-4 py-8 overflow-hidden"
      >
        {/* Subtle paper grain overlay / grid details */}
        <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full flex flex-col items-center text-center relative z-10 h-full justify-between py-2">
          
          {/* Header Container Area - holds both overlapping headers */}
          <div className="relative w-full flex items-center justify-center min-h-[90px] mt-2">
            
            {/* Header Group A: Hero Title */}
            <div className="hero-header w-full absolute top-0 flex flex-col items-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08] max-w-4xl px-2">
                Find the perfect <br className="hidden sm:inline" />
                Campus Items
              </h1>
            </div>

            {/* Header Group B: Catalog Title (Fades in on scroll) */}
            <div className="catalog-header w-full absolute top-10 flex flex-col items-center pointer-events-none">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111111] tracking-tight leading-tight">
                Best Selling Products
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-1.5 uppercase tracking-widest">
                verified student listings
              </p>
            </div>

          </div>

          {/* Cards Row - remains pinned in center */}
          <div className="relative w-full max-w-5xl h-[34vh] min-h-[220px] max-h-[360px] flex items-center justify-center select-none">
            <div className="flex -space-x-10 sm:-space-x-12 md:-space-x-16 items-center justify-center">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="hero-card flex flex-col items-center relative hover:z-10"
                >
                  {/* Float speech bubble tag (Aesthetics tag) */}
                  {card.tag && (
                    <div className={`hero-tag absolute -top-10 left-1/3 -translate-x-1/2 z-20 ${card.tag.animation}`}>
                      <div className={`${card.tag.color} text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm whitespace-nowrap relative`}>
                        {card.tag.text}
                        {/* Triangle pointer */}
                        <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] ${card.tag.arrowColor}`} />
                      </div>
                    </div>
                  )}

                  {/* Inner Card - handles graphics and hovers */}
                  <div
                    className={`w-[22vh] h-[30vh] min-w-[120px] min-h-[160px] max-w-[185px] max-h-[250px] rounded-[20px] sm:rounded-[26px] bg-gradient-to-br ${card.gradient} flex flex-col justify-between shadow-lg shadow-slate-900/8 transition-all duration-300 ease-out cursor-pointer hover:shadow-xl hover:shadow-slate-950/15 hover:scale-105 hover:-translate-y-3`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="object-contain drop-shadow-2xl rounded-xl"
                    />
                  </div>

                  {/* Product Catalog Details (fades in under cards on scroll) */}
                  <div className="card-details absolute top-full mt-10 flex flex-col items-center pointer-events-none">
                    <span className="text-[12px] font-extrabold text-slate-800 tracking-wide truncate max-w-[130px]">
                      {card.title}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Footer Area - holds both overlapping footers */}
          <div className="relative w-full flex items-center justify-center min-h-[90px] mb-2">

            {/* Footer A: Hero subtext and CTA buttons */}
            <div className="hero-header w-full absolute bottom-10 flex flex-col items-center gap-4">
              <p className="max-w-xl text-xs sm:text-sm md:text-base text-slate-500 font-semibold leading-relaxed px-4">
                Buy, sell, and rent everything you need for your campus life.<br className="hidden sm:inline" />
                Whether it is textbooks, electronics, furniture & more.
              </p>
              <div className="flex items-center gap-3">
                <button className="cursor-pointer rounded-full bg-[#111111] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-6 py-3 shadow-md shadow-slate-900/10 hover:shadow-lg transition-all duration-300">
                  Start Exploring
                </button>
                <button className="cursor-pointer rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs sm:text-sm font-bold px-6 py-3 shadow-sm transition-all duration-300">
                  List an item
                </button>
              </div>
            </div>

            {/* Footer B: Catalog "Explore More" button (Fades in on scroll) */}
            <div className="catalog-footer w-full absolute bottom-10 flex flex-col items-center pointer-events-none">
              <button className="cursor-pointer rounded-full bg-[#111111] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-8 py-3.5 shadow-md shadow-slate-900/10 hover:shadow-lg transition-all duration-300 pointer-events-auto">
                Explore More Products
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Scroll Runway Spacer - gives ScrollTrigger height to scrub through */}
      <div className="h-[100vh] pointer-events-none" />

      
    </div>
    {/* ============================================================
          SOCIAL PROOF SECTION — "Built for Students. Trusted Across Campus."
          Appears naturally after the scroll animation runway ends.
      ============================================================ */}
      <section className="relative bg-white border-t border-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl h-100vh">

          {/* Section Header */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Built for Students.<br />
              <span className="text-emerald-600">Trusted Across Campus.</span>
            </h2>
            <p className="mt-2 text-slate-500 text-sm font-medium max-w-xs">
              The simplest way to buy and sell things with students around you.
            </p>
          </div>

          {/* 3-column bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Card 1 — Growing Community */}
            <div className="bg-green-50/50 rounded-2xl border border-gray-300 p-6 flex flex-col justify-between Zshadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-15 h-15 rounded-[3000px] bg-emerald-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base leading-tight">Join a Growing<br />Student Community</h3>
                  <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">Buy from classmates, sell what you no longer use, and give products a second life.</p>
                </div>
              </div>

              {/* Avatar Grid */}
              <div className="grid grid-cols-3 gap-4 p-4">
                {[
                  'https://i.pravatar.cc/80?img=11',
                  'https://i.pravatar.cc/80?img=47',
                  null,
                  'https://i.pravatar.cc/80?img=53',
                  'https://i.pravatar.cc/80?img=58',
                  'https://i.pravatar.cc/80?img=45',
                  null,
                  'https://i.pravatar.cc/80?img=12',
                  null,
                ].map((src, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center">
                    {src ? (
                      <img src={src} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-3 flex-wrap">
                <button className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200">
                  Start Selling
                </button>
                <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                  Browse Products
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2 — 500+ Products Listed */}
            <div className="bg-gradient-to-t from-green-100 via-white via-30% to-white rounded-2xl border border-gray-300 p-6 flex flex-col justify-between shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-15 h-15 mb-4 rounded-[3000px] bg-emerald-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-8xl font-black text-slate-900 leading-none">500+</p>
                <p className="text-emerald-600 font-bold text-3xl mt-1">Products Listed</p>
                <div className='border border-gray-200 my-6'></div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed w-50">
                  Find books, electronics, furniture, cycles and more from fellow students around your campus.
                </p>
              </div>
              {/* Box image placeholder */}
              <div className="flex justify-center">
                <div className="w-65 h-35 flex items-center justify-center ">
                  <img src="/second_hand_box.png" alt="" />
                </div>
              </div>
            </div>

            {/* Right Column — Categories + Testimonial */}
            <div className="flex flex-col gap-4">

              {/* Categories */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex justify-around">
                  {[
                    { label: 'Books', color: 'bg-blue-100 text-blue-600', icon: '📚' },
                    { label: 'Electronics', color: 'bg-slate-100 text-slate-600', icon: '💻' },
                    { label: 'Furniture', color: 'bg-amber-100 text-amber-600', icon: '🪑' },
                    { label: 'Cycles', color: 'bg-emerald-100 text-emerald-600', icon: '🚲' },
                    { label: 'Hostel Essentials', color: 'bg-pink-100 text-pink-600', icon: '🎒' },
                  ].map((cat) => (
                    <div key={cat.label} className="flex flex-col items-center gap-1.5">
                      <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center text-xl shadow-sm`}>
                        {cat.icon}
                      </div>
                      <span className="text-[9px] font-semibold text-slate-500 text-center leading-tight max-w-[44px]">{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 shadow-sm flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="text-3xl text-amber-400 font-black leading-none mb-2">"</div>
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    I sold my first-year engineering books in just two days. Much easier than posting everywhere.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/60?img=33"
                    alt="Aryan"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">Aryan</p>
                    <p className="text-[10px] text-slate-400 font-medium">CSE, 2nd Year</p>
                    <div className="text-amber-400 text-xs mt-0.5">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Trust Badges row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { icon: '🛡️', label: 'Student Verified', desc: 'Only students from verified campuses.' },
              { icon: '💬', label: 'WhatsApp Chat', desc: 'Connect with sellers instantly on WhatsApp.' },
              { icon: '🚫', label: 'No Middleman', desc: 'You chat directly with the seller.' },
              { icon: '🏷️', label: 'No Commission', desc: "It's completely free to buy and sell." },
              { icon: '🔒', label: 'Safe & Trusted', desc: 'We keep the platform safe and reliable.' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-start gap-2.5 bg-white rounded-xl border border-slate-100 p-3 shadow-sm">
                <span className="text-xl flex-shrink-0">{badge.icon}</span>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{badge.label}</p>
                  <p className="text-[10px] text-slate-400 font-medium leading-snug mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
</>
  );
}