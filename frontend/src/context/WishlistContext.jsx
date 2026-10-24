import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

export function WishlistProvider({ children }) {
  const { isLoggedIn } = useAuth();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================
  // GET WISHLIST FROM BACKEND
  // =========================================

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch wishlist");
      }

      setWishlistItems(data.wishlist || []);

    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };


  // =========================================
  // FETCH WHEN USER LOGS IN
  // =========================================

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isLoggedIn]);


  // =========================================
  // ADD TO WISHLIST
  // =========================================

  const addToWishlist = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User must be logged in");
      return;
    }

    try {
      const productId = product._id || product.id;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to wishlist");
      }

      if (data.wishlist) {
        // POST currently returns IDs.
        // Fetch again so frontend gets complete products.
        await fetchWishlist();
      } else {
        await fetchWishlist();
      }

    } catch (error) {
      console.error("Failed to add to wishlist:", error);
    }
  };


  // =========================================
  // REMOVE FROM WISHLIST
  // =========================================

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove from wishlist");
      }

      await fetchWishlist();

    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };


  // =========================================
  // CLEAR WISHLIST
  // =========================================

  const clearWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear wishlist");
      }

      setWishlistItems([]);

    } catch (error) {
      console.error("Failed to clear wishlist:", error);
    }
  };


  // =========================================
  // CHECK IF PRODUCT IS IN WISHLIST
  // =========================================

  const isInWishlist = (productId) => {
    return wishlistItems.some((product) => {
      const id = product?._id || product?.id || product;

      return id === productId;
    });
  };


  // =========================================
  // WISHLIST COUNT
  // =========================================

  const wishlistCount = wishlistItems.length;


  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,

        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,

        wishlistCount,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}


export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within a WishlistProvider"
    );
  }

  return context;
}