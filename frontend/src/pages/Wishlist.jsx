import React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Trash2,
  MessageCircle,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
    wishlistCount,
  } = useWishlist();

  const { addToCart, isInCart } = useCart();

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <main className="min-h-screen bg-[#F7F8F5] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <Link
              to="/shop"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-emerald-600"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>

            <div className="flex items-center gap-3">

              <h1 className="font-archivo text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Wishlist
              </h1>

              {wishlistCount > 0 && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  {wishlistCount}
                </span>
              )}

            </div>

            <p className="mt-2 text-sm text-slate-500">
              Save the things you don't want to lose.
            </p>

          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 self-start rounded-xl px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 sm:self-auto"
            >
              <Trash2 size={16} />
              Clear Wishlist
            </button>
          )}

        </div>

        {/* =====================================================
            EMPTY WISHLIST
        ====================================================== */}

        {wishlistItems.length === 0 ? (
          <section className="mt-8 flex min-h-[500px] flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-white px-6 text-center shadow-sm">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Heart size={35} />
            </div>

            <h2 className="mt-6 font-archivo text-2xl font-black text-slate-950">
              Your wishlist is empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Save products you're interested in and come back to
              them whenever you're ready.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Explore Products
              <ArrowRight size={17} />
            </button>

          </section>
        ) : (

          /* =====================================================
              WISHLIST GRID
          ====================================================== */

          <section className="mt-8">

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {wishlistItems.map((item) => (

                <article
                  key={item.id || item._id}
                  className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-105"
                    />

                    {/* Wishlist button */}

                    <button
                      onClick={() =>
                        removeFromWishlist(
                          item.id || item._id
                        )
                      }
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-md transition hover:bg-red-50"
                      aria-label="Remove from wishlist"
                    >
                      <Heart
                        size={19}
                        fill="currentColor"
                      />
                    </button>

                    {/* Condition */}

                    <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-sm">
                      {item.condition}
                    </span>

                  </div>

                  {/* =================================================
                      DETAILS
                  ================================================== */}

                  <div className="p-5">

                    {/* Category */}

                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      {item.category}
                    </p>

                    {/* Title */}

                    <h2 className="mt-1 line-clamp-2 min-h-[48px] text-lg font-black leading-6 text-slate-950">
                      {item.title}
                    </h2>

                    {/* Price */}

                    <p className="mt-3 text-2xl font-black text-slate-950">
                      {formatPrice(item.price)}
                    </p>

                    {/* Seller */}

                    <div className="mt-4 border-t border-slate-100 pt-4">

                      <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">

                          <p className="text-xs text-slate-400">
                            Listed by
                          </p>

                          <p className="truncate text-sm font-bold text-slate-800">
                            {item.seller?.name ||
                              "Campus Seller"}
                          </p>

                        </div>

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-black text-white">
                          {item.seller?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "S"}
                        </div>

                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <MapPin size={12} />

                        <span className="truncate">
                          {item.seller?.college ||
                            "Manipal University Jaipur"}
                        </span>
                      </div>

                    </div>

                    {/* =================================================
                        ACTIONS
                    ================================================== */}

                    <div className="mt-5 grid grid-cols-2 gap-2">

                      {/* Contact Seller */}

                      <button
                        onClick={() =>
                          console.log(
                            "Contact seller:",
                            item.seller
                          )
                        }
                        className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <MessageCircle size={16} />
                        Contact
                      </button>

                      {/* Add to Cart */}

                      <button
                        onClick={() =>
                          handleAddToCart(item)
                        }
                        disabled={isInCart(
                          item.id || item._id
                        )}
                        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <ShoppingCart size={16} />

                        {isInCart(
                          item.id || item._id
                        )
                          ? "In Cart"
                          : "Add to Cart"}
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          </section>
        )}

        {/* =====================================================
            TRUST BANNER
        ====================================================== */}

        {wishlistItems.length > 0 && (
          <section className="mt-8 rounded-[28px] bg-[#E8F7E9] px-6 py-6 sm:px-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600">
                  <ShieldCheck size={21} />
                </div>

                <div>

                  <h3 className="text-sm font-black text-emerald-900">
                    Made for campus connections
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-emerald-800/70">
                    Save products, talk directly to students,
                    and meet safely on campus.
                  </p>

                </div>

              </div>

              <Link
                to="/shop"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white transition hover:bg-emerald-600"
              >
                Discover More
                <ArrowRight size={15} />
              </Link>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}