import React, { useState } from 'react';

export default function Navbar() {
  const [activeMain, setActiveMain] = useState('Home');
  const [activeMode, setActiveMode] = useState('Buy');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainLinks = ['Home', 'Shop', 'Sell Item'];
  const modeLinks = ['Buy', 'Rent'];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-2.5 cursor-pointer group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/10 group-hover:scale-105 transition-transform duration-300">
              <svg
                className="h-5.5 w-5.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-800">
              Campus<span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kart</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Pill Container 1: Home, Shop, Sell Item */}
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-100/70 p-1.5 shadow-inner">
              {mainLinks.map((link) => {
                const isActive = activeMain === link;
                return (
                  <button
                    key={link}
                    onClick={() => setActiveMain(link)}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-sm shadow-slate-900/5'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {link}
                  </button>
                );
              })}
            </div>

            {/* Pill Container 2: Buy, Rent */}
            <div className="flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-100/70 p-1.5 shadow-inner">
              {modeLinks.map((link) => {
                const isActive = activeMode === link;
                return (
                  <button
                    key={link}
                    onClick={() => setActiveMode(link)}
                    className={`relative rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {link}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Section: Auth links */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors duration-200 cursor-pointer">
              Log In
            </button>
            <button className="cursor-pointer rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-slate-900/15 hover:-translate-y-0.5 transition-all duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-100 bg-white/95 backdrop-blur-md ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4 px-4">
          {/* Main Navigation Stack */}
          <div className="space-y-1.5 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-2">
            <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</div>
            {mainLinks.map((link) => {
              const isActive = activeMain === link;
              return (
                <button
                  key={link}
                  onClick={() => {
                    setActiveMain(link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-emerald-600 shadow-sm border border-slate-100'
                      : 'text-slate-600 hover:bg-slate-100/50 hover:text-slate-800'
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>

          {/* Mode Selector Stack */}
          <div className="space-y-1.5 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-2">
            <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Transaction Type</div>
            <div className="grid grid-cols-2 gap-2">
              {modeLinks.map((link) => {
                const isActive = activeMode === link;
                return (
                  <button
                    key={link}
                    onClick={() => {
                      setActiveMode(link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-100/50 hover:text-slate-800'
                    }`}
                  >
                    {link}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auth Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <button className="flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              Log In
            </button>
            <button className="flex w-full items-center justify-center rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
