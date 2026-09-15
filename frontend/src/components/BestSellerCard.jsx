import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

export default function BestSellerCard({ product, isActive }) {
  return (
    <article
      className={`group relative w-full rounded-[32px] border border-[#E7DFD0] bg-[#FAF5ED] p-6 sm:p-7 shadow-xl shadow-amber-950/5 transition-all duration-300 select-none ${
        isActive ? "ring-2 ring-[#B09874]/40 shadow-2xl" : ""
      }`}
    >
      {/* Top Header: Tag + Wishlist */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#EBE2D3] px-3.5 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#5C4C36]">
          {product.tag || "POPULAR"}
        </span>

        <button
          type="button"
          aria-label="Add to Wishlist"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#7A6B56] transition-transform hover:scale-110 hover:text-red-500"
        >
          <Heart size={19} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative my-4 flex h-44 sm:h-52 w-full items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className="h-full w-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Sub-dots indicator inside card */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <span className="h-2 w-2 rounded-full bg-[#B09874]" />
        <span className="h-2 w-2 rounded-full bg-[#E5DCCB]" />
        <span className="h-2 w-2 rounded-full bg-[#E5DCCB]" />
      </div>

      {/* Product Details */}
      <div className="text-left">
        <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-[#2C2115] line-clamp-1">
          {product.name}
        </h3>

        <p className="mt-1 min-h-[38px] text-xs sm:text-sm font-medium leading-relaxed text-[#7A6B56] line-clamp-2">
          {product.description || "High quality product with premium student value."}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#6E5D44]">
          <span className="text-amber-600">★</span>
          <span>{product.rating}</span>
          <span className="text-[#9A8B74]">({product.reviewsCount || 89})</span>
        </div>

        {/* Bottom Price + CTA */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#2C2115]">
            {product.price}
          </span>

          {isActive ? (
            <button
              type="button"
              className="flex items-center gap-2 rounded-2xl bg-[#A68F6C] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#123F1B] hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              aria-label="Add to Cart"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBE2D3] text-[#5C4C36] shadow-sm transition-all duration-300 hover:bg-[#123F1B] hover:text-white cursor-pointer"
            >
              <ShoppingCart size={17} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}