import React from "react";
import { BookMarked, Leaf, MessageCircle, IndianRupee } from "lucide-react";

export default function WhyStudentsChoose() {
  const cards = [
    {
      num: "01",
      numGradient: "from-[#90AD2E] to-[#BDD3A7]/30",
      iconBg: "bg-[#E8EDD6]",
      iconColor: "text-[#123F1B]",
      pillBg: "bg-[#90AD2E]",
      title: "Save More",
      description:
        "Find quality textbooks, gadgets, furniture and more at student-friendly prices.",
      icon: <BookMarked className="w-8 h-8 sm:w-10 sm:h-10 text-[#123F1B]" strokeWidth={2} />,
    },
    {
      num: "02",
      numGradient: "from-purple-500 to-purple-200/30",
      iconBg: "bg-purple-100/80",
      iconColor: "text-purple-600",
      pillBg: "bg-purple-300",
      title: "Earn Easily",
      description:
        "Turn unused items into cash and help another student at the same time.",
      icon: (
        <div className="relative flex items-center justify-center">
          {/* Money Bag SVG */}
          <svg className="w-9 h-9 sm:w-11 sm:h-11 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 4a1.5 1.5 0 0 0-1.39-1H9.89A1.5 1.5 0 0 0 8.5 4C6.5 5 5 7 5 9.5c0 4.5 3 10.5 7 11.5 4-1 7-7 7-11.5C19 7 17.5 5 15.5 4zM12 7.5a1 1 0 0 1 1 1v1.5h1a1 1 0 1 1 0 2h-1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1h-1a1 1 0 1 1 0-2h1V8.5a1 1 0 0 1 1-1z" />
          </svg>
        </div>
      ),
    },
    {
      num: "03",
      numGradient: "from-blue-500 to-blue-200/30",
      iconBg: "bg-blue-100/80",
      iconColor: "text-blue-600",
      pillBg: "bg-blue-300",
      title: "Chat Directly",
      description:
        "Connect instantly with buyers or sellers on WhatsApp. No middleman, no hassle.",
      icon: (
        <svg className="w-9 h-9 sm:w-11 sm:h-11 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      num: "04",
      numGradient: "from-emerald-500 to-emerald-200/30",
      iconBg: "bg-emerald-100/80",
      iconColor: "text-emerald-700",
      pillBg: "bg-emerald-300",
      title: "Reuse & Save More",
      description:
        "Give your items a second life and build a more sustainable campus together.",
      icon: <Leaf className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-600" strokeWidth={2} />,
    },
  ];

  return (
    <section className="relative w-full bg-[#FAF8F3] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center">
        {/* Eyebrow badge with horizontal lines */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#90AD2E]" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#123F1B]">
            WHY STUDENTS CHOOSE
          </span>
          <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#90AD2E]" />
        </div>

        {/* Main Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
          Built for Students.<br />
          <span className="text-[#123F1B]">Made for Campus.</span>
        </h2>

        {/* Cards Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 items-stretch">
          {cards.map((card) => (
            <div key={card.num} className="relative flex flex-col items-center group">
              {/* Large Number Watermark behind/above card */}
              <span
                className={`text-8xl sm:text-9xl font-black leading-none bg-gradient-to-b ${card.numGradient} bg-clip-text text-transparent select-none transition-transform duration-300 group-hover:scale-105 z-0 -mb-10 sm:-mb-12`}
              >
                {card.num}
              </span>

              {/* Card Body */}
              <div className="relative z-10 w-full h-full rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-8 flex flex-col items-center justify-between text-center shadow-lg shadow-slate-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10">
                <div className="flex flex-col items-center w-full">
                  {/* Icon Container */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}
                  >
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-3">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Accent Pill Line */}
                <div className={`mt-8 h-1 w-10 rounded-full ${card.pillBg} opacity-80`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
