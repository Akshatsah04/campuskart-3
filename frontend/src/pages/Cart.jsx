import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  MessageCircle,
  MapPin,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
  } = useCart();

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
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

            <h1 className="font-archivo text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {cartCount === 0
                ? "Your cart is currently empty."
                : `${cartCount} ${cartCount === 1 ? "item" : "items"} in your cart`}
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="flex items-center gap-2 self-start rounded-xl px-3 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50 sm:self-auto"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          )}

        </div>

        {/* =====================================================
            EMPTY CART
        ====================================================== */}

        {cartItems.length === 0 ? (
          <section className="mt-8 flex min-h-[500px] flex-col items-center justify-center rounded-[28px] border border-slate-200 bg-white px-6 text-center shadow-sm">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ShoppingBag size={34} />
            </div>

            <h2 className="mt-6 font-archivo text-2xl font-black text-slate-950">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Looks like you haven't added anything yet. Explore products
              from students around your campus.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-6 flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
            >
              Browse Products
              <ArrowRight size={17} />
            </button>

          </section>
        ) : (

          /* =====================================================
              CART CONTENT
          ====================================================== */

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* =================================================
                LEFT — CART ITEMS
            ================================================== */}

            <section className="space-y-4">

              {cartItems.map((item) => (

                <article
                  key={item.id || item._id}
                  className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-5">

                    {/* Product Image */}

                    <Link
                      to={`/product/${item.id || item._id}`}
                      className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-contain p-4 transition duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* Product Details */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                            {item.category}
                          </p>

                          <h2 className="mt-1 line-clamp-2 text-base font-black leading-6 text-slate-950 sm:text-lg">
                            {item.title}
                          </h2>

                        </div>

                        {/* Remove */}

                        <button
                          onClick={() => removeFromCart(item.id || item._id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      {/* Condition */}

                      <div className="mt-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                          {item.condition}
                        </span>
                      </div>

                      {/* Seller */}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                        <span>
                          Seller:{" "}
                          <span className="font-semibold text-slate-600">
                            {item.seller?.name || "Campus Seller"}
                          </span>
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.seller?.college || "Manipal University Jaipur"}
                        </span>

                      </div>

                      {/* Bottom Row */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        {/* Quantity */}
                        <div className="flex items-center rounded-xl border border-slate-200">

                            <button
                            onClick={() =>
                                updateQuantity(item.id || item._id, -1)
                            }
                            className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                            <Minus size={15} />
                            </button>

                            <span className="w-8 text-center text-sm font-bold text-slate-900">
                            {item.quantity}
                            </span>

                            <button
                            onClick={() =>
                                updateQuantity(item.id || item._id, 1)
                            }
                            className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                            <Plus size={15} />
                            </button>

                        </div>

                        {/* Price */}
                        <div className="text-right">

                            <p className="text-lg font-black text-slate-950">
                            {formatPrice(item.price * item.quantity)}
                            </p>

                            {item.quantity > 1 && (
                            <p className="text-[11px] text-slate-400">
                                {formatPrice(item.price)} each
                            </p>
                            )}

                        </div>

                        </div>

                        {/* Contact Seller */}
                        <button
                        onClick={() => {
                            console.log("Contact seller:", item.seller);
                        }}
                        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-emerald-600"
                        >
                        <MessageCircle size={17} />

                        Contact{" "}
                        {item.seller?.name
                            ? item.seller.name.split(" ")[0]
                            : "Seller"}
                        </button>

                      </div>

                    </div>

                </article>

              ))}

            </section>

            {/* =================================================
                RIGHT — ORDER SUMMARY
            ================================================== */}

            <aside className="lg:sticky lg:top-24 lg:h-fit">

              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                <h2 className="font-archivo text-xl font-black text-slate-950">
                  Cart Summary
                </h2>

                {/* Price */}

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Items ({cartCount})
                    </span>

                    <span className="font-semibold text-slate-900">
                      {formatPrice(cartSubtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Platform Fee
                    </span>

                    <span className="font-semibold text-emerald-600">
                      Free
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4">

                    <div className="flex items-center justify-between">

                      <span className="text-base font-bold text-slate-900">
                        Total
                      </span>

                      <span className="text-2xl font-black text-slate-950">
                        {formatPrice(cartSubtotal)}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Info */}

                <div className="mt-5 rounded-2xl bg-emerald-50 p-4">

                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <ShieldCheck size={17} />
                    </div>

                    <div>

                      <p className="text-xs font-bold text-emerald-800">
                        Student-to-student marketplace
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-emerald-700/70">
                        Contact sellers directly to discuss the item,
                        price and meetup details.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Seller Info */}

              <div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
                    M
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      CampusKart
                    </p>

                    <p className="text-xs text-slate-400">
                      Made for students
                    </p>
                  </div>

                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  No online payment is required. Connect with the seller
                  and complete the transaction safely on campus.
                </p>

              </div>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}