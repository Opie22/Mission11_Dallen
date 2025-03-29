import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Book } from "../models/Book";
import { CartItem } from "../models/CartItem";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book: Book) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.book.bookID === book.bookID);
      if (existing) {
        return prev.map(item =>
          item.book.bookID === book.bookID ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookID: number) => {
    setCartItems(prev => prev.filter(item => item.book.bookID !== bookID));
  };

  const clearCart = () => setCartItems([]);

  const getTotal = () => cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};
