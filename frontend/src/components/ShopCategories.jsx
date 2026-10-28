import React from "react";

const categories = [
  {
    name: "Electronics",
    image: "/categories_icon/electronics_icon.png",
    description: "Laptops, gadgets & more",
  },
  {
    name: "Textbooks",
    image: "/categories_icon/textbooks_icon.png",
    description: "Books for every course",
  },
  {
    name: "Furniture",
    image: "/categories_icon/furniture_icon.png",
    description: "Tables, chairs & more",
  },
  {
    name: "Clothing",
    image: "/categories_icon/clothing_icon.png",
    description: "Fashion at student prices",
  },
  {
    name: "Stationery",
    image: "/categories_icon/stationary_icon.png",
    description: "Study essentials",
  },
  {
    name: "Others",
    image: "/categories_icon/others_icon.png",
    description: "Find something unexpected",
  },
];

export default function ShopCategories() {
  return (
    <section className="w-full bg-[#FDFBF0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-1 text-sm font-bold uppercase tracking-wider text-emerald-600">
              Explore
            </p>

            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Shop by Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Find exactly what you need for campus life.
            </p>
          </div>

          <button
            type="button"
            className="hidden text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 sm:block"
          >
            View All →
          </button>
        </div>

        {/* Categories */}
        <div className="w-full min-w-0 max-w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex w-max gap-4">

          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className="group relative w-[130px] shrink-0 overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10"            >

              {/* Image */}
              <div className="relative h-20 overflow-hidden bg-white">

                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />



              </div>

              {/* Content */}
              <div className="p-4 flex items-center justify-center">

                <h3 className="text-base font-black text-slate-900 transition-colors group-hover:text-emerald-600">
                  {category.name}
                </h3>

              </div>

            </button>
          ))}

        </div>
        </div>

      </div>
    </section>
  );
}