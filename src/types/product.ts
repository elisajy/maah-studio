// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  soldOut?: boolean;
  category?: string;
  color?: string;
  size?: string;
}

// Filter Types
export interface FilterState {
  category: string;
  color: string;
  size: string;
  priceRange: [number, number];
}

// API Response Types
export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}

export interface FilterOptions {
  categories: string[];
  colors: string[];
  sizes: string[];
  priceRange: {
    min: number;
    max: number;
  };
}