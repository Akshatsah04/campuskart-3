import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
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
    clearCart,
    cartCount,
    cartSubtotal,
    loading,
  } = useCart();

  const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
      return "₹0";
    }

    return `₹${numericPrice.toLocaleString("en-IN")}`;
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
                  key={item.product._id}
                  className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-5">

                    {/* Product Image */}

                    <Link
                      to={`/product/${item.product._id}`}
                      className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-36 sm:w-36"
                    >
                      <img
                        src={item.product.images?.[0]?.url}
                        alt={item.product.title}
                        className="h-full w-full object-contain p-4 transition duration-300 hover:scale-105"
                      />
                    </Link>

                    {/* Product Details */}

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                            {item.product.category}
                          </p>

                          <h2 className="mt-1 line-clamp-2 text-base font-black leading-6 text-slate-950 sm:text-lg">
                            {item.product.title}
                          </h2>

                        </div>

                        {/* Remove */}

                        <button
                          onClick={() => removeFromCart(item.product._id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                      {/* Condition */}

                      <div className="mt-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                          {item.product.condition}
                        </span>
                      </div>

                      {/* Seller */}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">

                        <span>
                          Seller:{" "}
                          <span className="font-semibold text-slate-600">
                            {item.product.seller?.firstName
                              ? `${item.product.seller.firstName} ${item.product.seller.lastName || ""}`.trim()
                              : "Campus Seller"}
                          </span>
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {item.product.seller?.college || "Manipal University Jaipur"}
                        </span>

                      </div>

                      {/* Bottom Row */}
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        {/* Price */}
                        <div className="text-right">

                          <p className="text-lg font-black text-slate-950">
                            {formatPrice(item.product?.price)}
                          </p>


                        </div>

                      </div>

                      {/* Contact Seller */}
                      <button
                        onClick={() => {
                          console.log("Contact seller:", item.product.seller);
                        }}
                        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-emerald-600"
                      >
                        <MessageCircle size={17} />

                        Contact{" "}
                        {item.product.seller
                        ? `${item.product.seller.firstName} ${item.product.seller.lastName || ""}`.trim()
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