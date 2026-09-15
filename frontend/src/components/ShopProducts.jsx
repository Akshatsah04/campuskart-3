import React, { useEffect, useState } from "react";
import { Heart, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";


const categoryColors = {
  Electronics: "bg-blue-50 text-blue-600",
  Furniture: "bg-emerald-50 text-emerald-600",
  Textbooks: "bg-orange-50 text-orange-600",
  Clothing: "bg-yellow-50 text-yellow-700",
  Stationery: "bg-pink-50 text-pink-600",
  "Sports & Fitness": "bg-cyan-50 text-cyan-600",
  Others: "bg-purple-50 text-purple-600",
};

export default function ShopProducts({ products }) {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <section className="w-full bg-[#FDFBF0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-emerald-600">
              Discover
            </p>

            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find great deals from students around your campus.
            </p>
          </div>

          <p className="hidden text-sm font-semibold text-slate-400 sm:block">
            Showing 1–8 of 32 products
          </p>
        </div>

        {/* ================= PRODUCT GRID ================= */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">

          {currentProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <article
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >

                {/* ================= IMAGE ================= */}

                <div className="relative aspect-square overflow-hidden bg-slate-50">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Wishlist */}

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all ${isWishlisted
                        ? "border-red-100 bg-red-50 text-red-500"
                        : "border-white bg-white/90 text-slate-500 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                      }`}
                  >
                    <Heart
                      size={17}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Condition */}

                  <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm">
                    {product.condition}
                  </span>
                </div>

                {/* ================= CONTENT ================= */}

                <div className="p-4">

                  {/* Category */}

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${categoryColors[product.category] ||
                      "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {product.category}
                  </span>

                  {/* Product name */}

                  <h3 className="mt-2 line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-emerald-600">
                    {product.title}
                  </h3>

                  {/* Price */}

                  <div className="mt-2">
                    <span className="text-lg font-black text-slate-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Rating */}

                  <div className="mt-2 flex items-center gap-1.5">
                    <Star
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />

                    <span className="text-xs font-bold text-slate-700">
                      {product.rating}
                    </span>

                    <span className="text-xs text-slate-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Seller / Location */}

                  <div className="mt-3 border-t border-slate-100 pt-3">

                    <p className="truncate text-xs font-semibold text-slate-600">
                      Sold by {product.seller?.name}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin size={12} />
                      {product.location}
                    </div>

                  </div>

                </div>
              </article>
            );
          })}

        </div>

        {/* ================= PAGINATION ================= */}

        <div className="mt-10 flex items-center justify-center gap-2">

          {/* Previous */}

          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page Numbers */}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition-all ${currentPage === page
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                  }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}