import { CartItem } from "@/@types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.titulo === product.titulo,
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
        };
        return updatedCart;
      }
      return [...prevCart, { ...product }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.titulo !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "Add the CartProvider to the application's parent component.",
    );
  }
  return context;
};
