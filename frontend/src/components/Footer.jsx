import React, { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
} from "lucide-react";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  return (
    <footer className="bg-[#FDFBF0] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-[#EBE6CE] bg-[#FFFDF2] shadow-sm">

        {/* =====================================================
            DESKTOP / LAPTOP CONTENT
        ===================================================== */}

        <div className="relative px-6 pb-0 pt-8 sm:px-8 lg:px-12 lg:pt-10">

          {/* ================= TOP CONTENT ================= */}

          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">

            {/* ================= BRAND ================= */}

            <div className="md:col-span-1">
              <h2 className="max-w-[320px] text-xl font-black leading-tight text-slate-900 sm:text-2xl">
                mujshoppers is a student first marketplace built for campus life.
              </h2>

              <p className="mt-4 max-w-[300px] text-sm leading-6 text-slate-500">
                Buy, sell and discover everything you need from students
                around your campus.
              </p>
            </div>

            {/* ================= EXPLORE ================= */}

            <div className="hidden md:block">
              <h3 className="text-sm font-bold text-slate-900">
                Explore
              </h3>

              <nav className="mt-4 flex flex-col gap-2.5">
                <a
                  href="/"
                  className="w-fit text-sm text-slate-500 transition-colors hover:text-emerald-600"
                >
                  Home
                </a>

                <a
                  href="/shop"
                  className="w-fit text-sm text-slate-500 transition-colors hover:text-emerald-600"
                >
                  Shop
                </a>

                <a
                  href="#categories"
                  className="w-fit text-sm text-slate-500 transition-colors hover:text-emerald-600"
                >
                  Categories
                </a>

                <a
                  href="#sell"
                  className="w-fit text-sm text-slate-500 transition-colors hover:text-emerald-600"
                >
                  Sell an Item
                </a>

                <a
                  href="#how-it-works"
                  className="w-fit text-sm text-slate-500 transition-colors hover:text-emerald-600"
                >
                  How It Works
                </a>
              </nav>
            </div>

            {/* ================= SOCIAL ================= */}

            <div className="mt-4 flex flex-col gap-2.5">

            <a
                href="#instagram"
                className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
            >
                <span className="text-sm font-bold">◎</span>
                @mujshoppers
            </a>

            <a
                href="#twitter"
                className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
                <span className="text-sm font-black">𝕏</span>
                @mujshoppers
            </a>

            <a
                href="#youtube"
                className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
                <span className="text-xs font-black">▶</span>
                @mujshoppers
            </a>

            <a
                href="#linkedin"
                className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
                <span className="text-xs font-black">in</span>
                @mujshoppers
            </a>

            </div>

            {/* ================= RIGHT ACTIONS ================= */}

            <div className="hidden md:block">

              {/* Sell */}

              <a
                href="#sell"
                className="group flex items-start justify-between border-b border-slate-200 pb-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-emerald-600">
                      Sell on mujshoppers
                    </h3>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Turn your unused stuff into cash.
                  </p>
                </div>
              </a>

              {/* Help */}

              <a
                href="#support"
                className="group flex items-start justify-between pt-5"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Help & Support
                    </h3>

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white transition-transform group-hover:rotate-45">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    We're here when you need us.
                  </p>
                </div>
              </a>

            </div>

          </div>

          {/* =====================================================
              MOBILE ACCORDION
          ===================================================== */}

          <div className="relative z-10 mt-8 divide-y divide-slate-200 md:hidden">

            {/* Explore */}

            <div>
              <button
                type="button"
                onClick={() => toggleSection("explore")}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-bold text-slate-900">
                  Explore
                </span>

                <ChevronDown
                  size={18}
                  className={`text-slate-500 transition-transform ${
                    openSection === "explore"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openSection === "explore" && (
                <nav className="flex flex-col gap-3 pb-4">
                  <a
                    href="/"
                    className="text-sm text-slate-500"
                  >
                    Home
                  </a>

                  <a
                    href="/shop"
                    className="text-sm text-slate-500"
                  >
                    Shop
                  </a>

                  <a
                    href="#categories"
                    className="text-sm text-slate-500"
                  >
                    Categories
                  </a>

                  <a
                    href="#sell"
                    className="text-sm text-slate-500"
                  >
                    Sell an Item
                  </a>

                  <a
                    href="#how-it-works"
                    className="text-sm text-slate-500"
                  >
                    How It Works
                  </a>
                </nav>
              )}
            </div>

            {/* Follow */}

            <div>
              <button
                type="button"
                onClick={() => toggleSection("social")}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-bold text-slate-900">
                  Follow us
                </span>

                <ChevronDown
                  size={18}
                  className={`text-slate-500 transition-transform ${
                    openSection === "social"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {openSection === "social" && (
                <div className="flex flex-wrap gap-2 pb-4">

                  <a
                    href="#instagram"
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    Instagram
                  </a>

                  <a
                    href="#twitter"
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    X
                  </a>

                  <a
                    href="#youtube"
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    YouTube
                  </a>

                  <a
                    href="#linkedin"
                    className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
                  >
                    LinkedIn
                  </a>

                </div>
              )}
            </div>

            {/* Sell */}

            <a
              href="#sell"
              className="flex items-center justify-between py-4"
            >
              <span className="text-sm font-bold text-emerald-600">
                Sell on mujshoppers
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                <ArrowUpRight size={14} />
              </span>
            </a>

            {/* Support */}

            <a
              href="#support"
              className="flex items-center justify-between py-4"
            >
              <span className="text-sm font-bold text-slate-900">
                Help & Support
              </span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white">
                <ArrowUpRight size={14} />
              </span>
            </a>

          </div>

          {/* =====================================================
              LARGE WORDMARK
          ===================================================== */}

          <div className="pointer-events-none relative mt-8 h-[105px] overflow-hidden sm:h-[145px] lg:mt-5 lg:h-[180px]">

            <div className="absolute left-1/2 top-[25%] -translate-x-1/2 whitespace-nowrap text-[20vw] font-archivo font-bold leading-none tracking-[-0.08em] text-slate-950 sm:text-[20vw] lg:text-[9vw]">
              MUJSHOPPERS
            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 text-xs text-slate-400 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">

          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 mujshoppers</span>

            <span>•</span>

            <a
              href="#privacy"
              className="transition-colors hover:text-slate-700"
            >
              Privacy Policy
            </a>

            <span>•</span>

            <a
              href="#terms"
              className="transition-colors hover:text-slate-700"
            >
              Terms
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>Made for students.</span>

            <Heart
              size={15}
              className="text-slate-400"
            />
          </div>

        </div>

      </div>
    </footer>
  );
}