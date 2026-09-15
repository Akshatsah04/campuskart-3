import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const INITIAL_DEMO_CART = [
  {
    id: 1,
    title: "MacBook Pro M1 (16GB/512GB SSD)",
    price: 54999,
    condition: "Like New",
    category: "Electronics",
    image: "/categories/electronics.PNG",
    seller: { name: "Rahul Sharma", college: "Manipal University Jaipur", phone: "+91 98765 43210" },
    quantity: 1,
  },
  {
    id: 2,
    title: "Ergonomic Mesh Study Chair",
    price: 3499,
    condition: "Good",
    category: "Furniture",
    image: "/categories/furniture.PNG",
    seller: { name: "Ananya Gupta", college: "Manipal University Jaipur", phone: "+91 98765 12345" },
    quantity: 1,
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("campuskart_cart");
    return saved ? JSON.parse(saved) : INITIAL_DEMO_CART;
  });

  useEffect(() => {
    localStorage.setItem("campuskart_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id || item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id || item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id || product._id || Date.now(),
          title: product.title || product.name,
          price: typeof product.price === "number" ? product.price : parseFloat(String(product.price).replace(/[^0-9.]/g, "")),
          condition: product.condition || "Like New",
          category: product.category || "General",
          image: product.image || "/categories/electronics.PNG",
          seller: product.seller || { name: "Campus Seller", college: "MUJ", phone: "+91 98765 43210" },
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id && item._id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id || item._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id || item._id === id);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartSubtotal,
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
