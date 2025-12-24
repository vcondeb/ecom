import { create } from "zustand";
import { Product } from "@/db/schema";

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  filteredProducts: () => {
    const { products, selectedCategory } = get();
    if (!selectedCategory) return products;
    return products.filter((p) => p.category === selectedCategory);
  },
}));
