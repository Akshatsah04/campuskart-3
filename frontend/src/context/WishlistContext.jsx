import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

const INITIAL_DEMO_WISHLIST = [
  {
    id: 101,
    title: "iPhone 13 (128GB)",
    price: 32000,
    condition: "Like New",
    category: "Electronics",
    image: "/categories/electronics.PNG",
    seller: {
      name: "Rahul Sharma",
      college: "Manipal University Jaipur",
      phone: "+91 98765 43210",
    },
  },
  {
    id: 102,
    title: "Engineering Mathematics Books",
    price: 700,
    condition: "Good",
    category: "Books",
    image: "/categories/textbooks.PNG",
    seller: {
      name: "Aditya Kumar",
      college: "Manipal University Jaipur",
      phone: "+91 98765 12345",
    },
  },
  {
    id: 103,
    title: "Ergonomic Study Chair",
    price: 2500,
    condition: "Good",
    category: "Furniture",
    image: "/categories/furniture.PNG",
    seller: {
      name: "Ananya Gupta",
      college: "Manipal University Jaipur",
      phone: "+91 98765 45678",
    },
  },
];

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("campuskart_wishlist");

    return saved
      ? JSON.parse(saved)
      : INITIAL_DEMO_WISHLIST;
  });

  useEffect(() => {
    localStorage.setItem(
      "campuskart_wishlist",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const productId = product.id || product._id;

      const alreadyExists = prev.some(
        (item) =>
          item.id === productId ||
          item._id === productId
      );

      if (alreadyExists) {
        return prev;
      }

      return [
        ...prev,
        {
          id: productId || Date.now(),
          title: product.title || product.name,
          price:
            typeof product.price === "number"
              ? product.price
              : parseFloat(
                  String(product.price).replace(
                    /[^0-9.]/g,
                    ""
                  )
                ),
          condition: product.condition || "Like New",
          category: product.category || "General",
          image:
            product.image ||
            product.images?.[0] ||
            "/categories/electronics.PNG",
          seller:
            product.seller || {
              name: "Campus Seller",
              college: "Manipal University Jaipur",
              phone: "",
            },
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id &&
          item._id !== id
      )
    );
  };

  const isInWishlist = (id) => {
    return wishlistItems.some(
      (item) =>
        item.id === id ||
        item._id === id
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
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