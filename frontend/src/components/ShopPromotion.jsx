import React from "react";

export default function ShopPromotion() {
  return (
    <section className="w-full bg-[#FDFBF0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="group relative overflow-hidden rounded-3xl shadow-sm">
          <img
            src="/banners/shop-promotion.png"
            alt="CampusKart - Everything you need for a better campus life"
            className="block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}