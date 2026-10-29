import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

const categories = [
  {
  name: "All Products",
  image: "/categories_icon/all_icon.png",
  description: "Browse everything",
},
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
  name: "Sports",
  image: "/categories_icon/sports_icon.png",
  description: "Sports equipment & more",
},
{
name: "Others",
image: "/categories_icon/others_icon.png",
description: "Find something unexpected",
},
];

export default function ShopCategories() {
const navigate = useNavigate();
const [searchParams] = useSearchParams();

const selectedCategory = searchParams.get("category") || "All Products";

const handleCategoryClick = (categoryName) => {
  if (categoryName === "All Products") {
    navigate("/shop");
  } else {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  }
};

return ( <section className="w-full bg-[#FDFBF0] px-4 py-8 sm:px-6 lg:px-8"> <div className="mx-auto max-w-7xl">
{/* Header */} <div className="mb-6 flex items-end justify-between"> <div> <p className="mb-1 text-sm font-bold uppercase tracking-wider text-emerald-600">
Explore </p>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
          Shop by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Find exactly what you need for campus life.
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/shop")}
        className="hidden text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700 sm:block"
      >
        View All →
      </button>
    </div>

    {/* Categories */}
    <div className="w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden px-1 pt-2 pb-4 scrollbar-hide">
      <div className="flex w-max gap-4">
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => handleCategoryClick(category.name)}
            aria-label={`Shop ${category.name}`}
            aria-pressed={selectedCategory === category.name}
            className={`group relative w-[130px] shrink-0 overflow-hidden rounded-2xl text-left transition-all duration-300 ${ selectedCategory === category.name ? "bg-emerald-50 ring-2 ring-emerald-500 shadow-md shadow-emerald-900/10 -translate-y-1" : "bg-white ring-1 ring-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10" }`}
          >
            {/* Image */}
            <div className="relative h-20 overflow-hidden bg-white">
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              {selectedCategory === category.name && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
              <Check size={13} strokeWidth={3} />
              </span>
              )}
            </div>

            {/* Content */}
            <div className="flex items-center justify-center p-4">
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
