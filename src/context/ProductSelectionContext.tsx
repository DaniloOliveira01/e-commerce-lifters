import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProductSelectionContextType {
  selectedColor: string;
  selectedSize: string;
  selectColor: (color: string) => void;
  selectSize: (size: string) => void;
  clearSetSelecteds: () => void;
}

const ProductSelectionContext =
  createContext<ProductSelectionContextType | null>(null);

export const ProductSelectionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>("#000");
  const [selectedSize, setSelectedSize] = useState<string>("M");

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };

  const selectSize = (size: string) => {
    setSelectedSize(size);
  };

  const clearSetSelecteds = () => {
    setSelectedColor("");
    setSelectedSize("");
  };

  const value: ProductSelectionContextType = {
    selectedColor,
    selectedSize,
    selectColor,
    selectSize,
    clearSetSelecteds,
  };

  return (
    <ProductSelectionContext.Provider value={value}>
      {children}
    </ProductSelectionContext.Provider>
  );
};

export const useProductSelection = () => {
  const context = useContext(ProductSelectionContext);
  if (!context) {
    throw new Error(
      "Add the ProductSelectProvider to the application's parent component",
    );
  }
  return context;
};
