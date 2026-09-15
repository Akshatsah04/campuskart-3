import React, { useState } from "react";

export default function ShopSearch({
  onSearchChange,
  onFiltersChange,
  onSortChange,
}) {
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [sortOption, setSortOption] = useState("Relevance");

  const categories = [
    "All",
    "Electronics",
    "Textbooks",
    "Furniture",
    "Clothing",
    "Stationery",
    "Sports & Fitness",
    "Others",
  ];

  const conditions = [
    "All",
    "New",
    "Like New",
    "Good",
    "Fair",
  ];

  const locations = [
    "All",
    "My Campus",
    "Nearby",
  ];

  const handleReset = () => {
    setSelectedCategory("All");
    setSelectedCondition("All");
    setSelectedLocation("All");
    setMinPrice("");
    setMaxPrice("");

    onFiltersChange?.({
      category: "All",
      condition: "All",
      location: "All",
      minPrice: "",
      maxPrice: "",
    });
  };

  return (
    <>
      {/* =====================================================
          SEARCH / FILTER / SORT SECTION
          ===================================================== */}

      <section className="relative z-40 w-full bg-[#FDFBF0] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-3 md:flex-row md:items-center">

            {/* ================= SEARCH BAR ================= */}

            <div className="relative flex min-h-[54px] flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 focus-within:border-emerald-400 focus-within:shadow-md">

              {/* Search Icon */}

              <div className="flex w-12 flex-shrink-0 items-center justify-center text-slate-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              {/* Input */}

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  onSearchChange?.(value);
                }}
                placeholder="Search for books, laptops, furniture, clothes..."
                className="min-w-0 flex-1 bg-transparent px-1 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-[15px]"
              />

              {/* Search Button */}

              <button
                type="button"
                className="hidden bg-emerald-600 px-7 text-sm font-bold text-white transition-colors duration-300 hover:bg-emerald-700 sm:block"
              >
                Search
              </button>
            </div>

            {/* ================= FILTER BUTTON ================= */}

            <button
              type="button"
              onClick={() => {
                setIsFilterOpen(true);
                setIsSortOpen(false);
              }}
              className="flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 md:min-w-[120px]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M7 12h10M10 18h4"
                />
              </svg>

              Filter
            </button>

            {/* ================= SORT BUTTON ================= */}

            <div className="relative">

              <button
                type="button"
                onClick={() => {
                  setSortOption(option);
                  setIsSortOpen(false);
                  onSortChange?.(option);
                }}
                className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 md:min-w-[120px]"
              >
                {/* Sort Icon */}

                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 6v12m0 0-3-3m3 3 3-3M16 18V6m0 0-3 3m3-3 3 3"
                  />
                </svg>

                Sort

                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m6 9 6 6 6-6"
                  />
                </svg>
              </button>

              {/* ================= SORT DROPDOWN ================= */}

              {isSortOpen && (
                <div className="absolute right-0 top-[62px] z-50 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">

                  {[
                    "Relevance",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Highest Rated",
                    "Newest",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setSortOption(option);
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors ${sortOption === option
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {option}

                      {sortOption === option && (
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      )}
                    </button>
                  ))}

                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTER OVERLAY
          ===================================================== */}

      {isFilterOpen && (
        <div className="fixed inset-0 z-[100]">

          {/* Background Overlay */}

          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* =================================================
              FILTER PANEL
              ================================================= */}

          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Filters
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Refine your product search
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-800"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6 6 18"
                  />
                </svg>
              </button>
            </div>

            {/* ================= FILTER CONTENT ================= */}

            <div className="flex-1 overflow-y-auto px-6 py-6">

              {/* ================= CATEGORY ================= */}

              <div className="border-b border-slate-100 pb-6">

                <h3 className="mb-4 text-sm font-black text-slate-900">
                  Category
                </h3>

                <div className="grid grid-cols-2 gap-2">

                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition-all ${selectedCategory === category
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                        }`}
                    >
                      {category}
                    </button>
                  ))}

                </div>
              </div>

              {/* ================= PRICE ================= */}

              <div className="border-b border-slate-100 py-6">

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="text-sm font-black text-slate-900">
                    Price Range
                  </h3>

                  <span className="text-xs font-semibold text-emerald-600">
                    ₹0 - ₹50,000
                  </span>

                </div>

                {/* Slider */}

                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={maxPrice || 50000}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-emerald-600"
                />

                {/* Min / Max */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-500">
                      Minimum
                    </label>

                    <div className="flex items-center rounded-xl border border-slate-200 px-3 focus-within:border-emerald-400">
                      <span className="text-sm text-slate-400">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                        className="w-full bg-transparent px-2 py-2.5 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-slate-500">
                      Maximum
                    </label>

                    <div className="flex items-center rounded-xl border border-slate-200 px-3 focus-within:border-emerald-400">
                      <span className="text-sm text-slate-400">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="50000"
                        className="w-full bg-transparent px-2 py-2.5 text-sm font-semibold outline-none"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* ================= CONDITION ================= */}

              <div className="border-b border-slate-100 py-6">

                <h3 className="mb-4 text-sm font-black text-slate-900">
                  Condition
                </h3>

                <div className="space-y-2">

                  {conditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => setSelectedCondition(condition)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${selectedCondition === condition
                            ? "border-emerald-600 bg-emerald-600"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {selectedCondition === condition && (
                          <svg
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        )}
                      </span>

                      <span
                        className={`text-sm font-semibold ${selectedCondition === condition
                            ? "text-emerald-700"
                            : "text-slate-600"
                          }`}
                      >
                        {condition}
                      </span>
                    </button>
                  ))}

                </div>
              </div>

              {/* ================= LOCATION ================= */}

              <div className="py-6">

                <h3 className="mb-4 text-sm font-black text-slate-900">
                  Location
                </h3>

                <div className="space-y-2">

                  {locations.map((location) => (
                    <button
                      key={location}
                      type="button"
                      onClick={() => setSelectedLocation(location)}
                      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-50"
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${selectedLocation === location
                            ? "border-emerald-600 bg-emerald-600"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {selectedLocation === location && (
                          <svg
                            className="h-3.5 w-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        )}
                      </span>

                      <span
                        className={`text-sm font-semibold ${selectedLocation === location
                            ? "text-emerald-700"
                            : "text-slate-600"
                          }`}
                      >
                        {location}
                      </span>
                    </button>
                  ))}

                </div>
              </div>

            </div>

            {/* ================= FOOTER ================= */}

            <div className="border-t border-slate-100 bg-white p-5">

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onFiltersChange?.({
                      category: selectedCategory,
                      condition: selectedCondition,
                      location: selectedLocation,
                      minPrice,
                      maxPrice,
                    });

                    setIsFilterOpen(false);
                  }}
                  className="flex-[1.5] rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg"
                >
                  Apply Filters
                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}