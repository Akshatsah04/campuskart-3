import React, { useEffect, useState } from "react";
import { Heart, Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const categoryColors = {
  Electronics: "bg-blue-50 text-blue-600",
  Furniture: "bg-emerald-50 text-emerald-600",
  Textbooks: "bg-orange-50 text-orange-600",
  Books: "bg-orange-50 text-orange-600",
  Clothing: "bg-yellow-50 text-yellow-700",
  Stationery: "bg-pink-50 text-pink-600",
  "Sports & Fitness": "bg-cyan-50 text-cyan-600",
  Sports: "bg-cyan-50 text-cyan-600",
  Others: "bg-purple-50 text-purple-600",
  Other: "bg-purple-50 text-purple-600",
};

// Normalize image field — handles Cloudinary objects, plain URLs, and legacy arrays
function getProductImage(product) {
  if (!product) return null;

  // product.images is the canonical field from backend
  const images = product.images;

  if (images && images.length > 0) {
    const first = images[0];
    if (typeof first === "object" && first.url) return first.url;
    if (typeof first === "string") return first;
  }

  // Fallback for legacy/mock data that may use product.image directly
  if (product.image) return product.image;

  return null;
}

// Normalize product title (backend uses "title", mock data uses "name")
function getProductTitle(product) {
  return product.title || product.name || "Untitled";
}

// Normalize product ID
function getProductId(product) {
  return product._id || product.id;
}

export default function ShopProducts({ products }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  if (products.length === 0) {
    return (
      <section className="w-full bg-[#FDFBF0] px-4 py-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-sm">
          <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <h3 className="mt-4 font-archivo text-xl font-black text-slate-900">No products found</h3>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FDFBF0] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
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
            {products.length} {products.length === 1 ? "listing" : "listings"} found
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {currentProducts.map((product) => {
            const productId = getProductId(product);
            const imageUrl = getProductImage(product);
            const title = getProductTitle(product);
            const wishlisted = isInWishlist(productId);

            return (
              <article
                key={productId}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* Image */}
                <Link to={`/product/${productId}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-slate-50">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-300">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                      </div>
                    )}

                    {/* Wishlist button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (wishlisted) {
                          removeFromWishlist(productId);
                        } else {
                          addToWishlist({
                            id: productId,
                            _id: productId,
                            title,
                            price: product.price,
                            condition: product.condition,
                            category: product.category,
                            image: imageUrl,
                            seller: product.seller
                          });
                        }
                      }}
                      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all ${
                        wishlisted
                          ? "border-red-100 bg-red-50 text-red-500"
                          : "border-white bg-white/90 text-slate-500 hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                      }`}
                    >
                      <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Condition badge */}
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur-sm">
                      {product.condition}
                    </span>

                    {/* Sold overlay */}
                    {product.status === "sold" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                        <span className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg">
                          Sold
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <Link to={`/product/${productId}`} className="block p-4">
                  {/* Category */}
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    categoryColors[product.category] || "bg-slate-100 text-slate-600"
                  }`}>
                    {product.category}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 line-clamp-2 min-h-[40px] text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-emerald-600">
                    {title}
                  </h3>

                  {/* Price */}
                  <div className="mt-2">
                    <span className="text-lg font-black text-slate-900">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Rating (only for mock/static data that has these fields) */}
                  {product.rating && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                      {product.reviews && (
                        <span className="text-xs text-slate-400">({product.reviews})</span>
                      )}
                    </div>
                  )}

                  {/* Seller / College */}
                  <div className="mt-3 border-t border-slate-100 pt-3">
                    <p className="truncate text-xs font-semibold text-slate-600">
                      {product.seller?.name
                        ? `Sold by ${product.seller.name}`
                        : product.seller
                          ? `Sold by ${product.seller}`
                          : "Campus Seller"}
                    </p>

                    {(product.college || product.seller?.college || product.location) && (
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                        <MapPin size={12} />
                        <span className="truncate">
                          {product.college || product.seller?.college || product.location}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition-all ${
                  currentPage === page
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}