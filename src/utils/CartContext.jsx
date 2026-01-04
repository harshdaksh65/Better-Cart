import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const maxQuantity =
        product.rating && typeof product.rating.count === "number"
          ? product.rating.count
          : Infinity;
      if (existing) {
        return prev.map((item) => {
          if (item.id !== product.id) return item;
          const nextQuantity = Math.min(item.quantity + 1, maxQuantity);
          return { ...item, quantity: nextQuantity };
        });
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => {
        if (item.id !== id) return item;
        const maxQuantity =
          item.rating && typeof item.rating.count === "number"
            ? item.rating.count
            : Infinity;
        const nextQuantity = Math.min(quantity, maxQuantity);
        return { ...item, quantity: nextQuantity };
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
