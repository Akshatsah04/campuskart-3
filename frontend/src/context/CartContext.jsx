import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

export function CartProvider({ children }) {
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================
  // GET CART FROM BACKEND
  // =========================================

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
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
        throw new Error(data.message || "Failed to fetch cart");
      }

      setCartItems(data.cart || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart whenever user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);


  // =========================================
  // ADD TO CART
  // =========================================

  const addToCart = async (product) => {
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
        throw new Error(data.message || "Failed to add product");
      }

      // Backend already returns the updated cart
      if (data.cart) {
        setCartItems(data.cart);
      } else {
        // In case product was already there,
        // refresh to make sure frontend is synchronized.
        await fetchCart();
      }

    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };


  // =========================================
  // REMOVE FROM CART
  // =========================================

  const removeFromCart = async (productId) => {
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
        throw new Error(data.message || "Failed to remove product");
      }

      setCartItems(data.cart || []);

    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };


  // =========================================
  // CLEAR CART
  // =========================================

  const clearCart = async () => {
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
        throw new Error(data.message || "Failed to clear cart");
      }

      setCartItems([]);

    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };


  // =========================================
  // CHECK IF PRODUCT IS IN CART
  // =========================================

  const isInCart = (productId) => {
    return cartItems.some((item) => {
      const id =
        item.product?._id ||
        item.product?.id ||
        item.product;

      return id === productId;
    });
  };


  // =========================================
  // CART COUNT
  // =========================================

  const cartCount = cartItems.length;


  // =========================================
  // CART SUBTOTAL
  // =========================================

  const cartSubtotal = cartItems.reduce((total, item) => {
    const price = Number(item.product?.price || 0);
    const quantity = item.quantity || 1;

    return total + price * quantity;
  }, 0);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,

        addToCart,
        removeFromCart,
        clearCart,
        isInCart,

        cartCount,
        cartSubtotal,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}