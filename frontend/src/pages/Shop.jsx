import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import ShopSearch from "../components/ShopSearch";
import ShopPromotion from "../components/ShopPromotion";
import ShopCategories from "../components/ShopCategories";
import ShopProducts from "../components/ShopProducts";

import { getProducts } from "../api/products";

export default function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [filters, setFilters] = useState({
    category: "All",
    condition: "All",
    location: "All",
    minPrice: "",
    maxPrice: "",
  });

  const [sortOption, setSortOption] = useState("Relevance");

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Search + filter + sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.title?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.seller?.name?.toLowerCase().includes(query) ||
          product.college?.toLowerCase().includes(query)
        );
      });
    }

    // Category
    if (filters.category !== "All") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Condition
    if (filters.condition !== "All") {
      result = result.filter(
        (product) => product.condition === filters.condition
      );
    }

    // Location / College
    if (filters.location !== "All") {
      result = result.filter(
        (product) => product.college === filters.location
      );
    }

    // Minimum price
    if (filters.minPrice !== "") {
      const min = Number(filters.minPrice);

      result = result.filter(
        (product) => Number(product.price) >= min
      );
    }

    // Maximum price
    if (filters.maxPrice !== "") {
      const max = Number(filters.maxPrice);

      result = result.filter(
        (product) => Number(product.price) <= max
      );
    }

    // Sort
    switch (sortOption) {
      case "Price: Low to High":
        result.sort(
          (a, b) => Number(a.price) - Number(b.price)
        );
        break;

      case "Price: High to Low":
        result.sort(
          (a, b) => Number(b.price) - Number(a.price)
        );
        break;

      case "Newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      default:
        break;
    }

    return result;
  }, [products, searchQuery, filters, sortOption]);

  return (
    <main className="min-h-screen bg-[#FDFBF0]">

      <ShopSearch
        onSearchChange={setSearchQuery}
        onFiltersChange={setFilters}
        onSortChange={setSortOption}
      />

      <ShopPromotion />

      <ShopCategories />

      {loading ? (
        <section className="flex items-center justify-center px-4 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </section>
      ) : error ? (
        <section className="px-4 py-16 text-center">
          <p className="text-red-500">
            {error}
          </p>
        </section>
      ) : (
        <ShopProducts products={filteredProducts} />
      )}

    </main>
  );
}