"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);
const CART_KEY = "ra_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((product, size, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, size, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id, size) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  }, []);

  const updateQuantity = useCallback((id, size, quantity) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalGHS = items.reduce((sum, i) => sum + i.priceGHS * i.quantity, 0);
  const subtotalUSD = items.reduce((sum, i) => sum + i.priceUSD * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotalGHS, subtotalUSD }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
