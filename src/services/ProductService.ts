import { Product, ProductsResponse, FilterOptions } from '../types/product';

// Mock Products Data
const mockProducts: Product[] = [
  { id: '1', name: 'Wide Leg Pants in Dark Denim', price: 119, imageUrl: 'src/images/apparel/IMG_7251.jpg', category: 'Pants', color: 'Dark Blue', size: 'M' },
  { id: '2', name: 'Wide Leg Pants in Light Denim', price: 119, imageUrl: 'src/images/apparel/IMG_7282.jpg', category: 'Pants', color: 'Light Blue', size: 'M' },
  { id: '3', name: 'Denim Button Vest', price: 119, imageUrl: 'src/images/apparel/IMG_7335.jpg', category: 'Tops', color: 'Dark Blue', size: 'L' },
  { id: '4', name: 'Ramie Pleating Blouse', price: 139, imageUrl: 'src/images/apparel/IMG_7391.jpg', category: 'Tops', color: 'Beige', size: 'M', soldOut: true },
  { id: '5', name: 'Splice Boy Shorts in Light Khaki', price: 89, imageUrl: 'src/images/apparel/IMG_7625.jpg', category: 'Shorts', color: 'Khaki', size: 'S' },
  { id: '6', name: 'Splice Boy Shorts in Pale Sage', price: 89, imageUrl: 'src/images/apparel/IMG_7734.jpg', category: 'Shorts', color: 'Sage', size: 'S' },
  { id: '7', name: 'Oversized Shirt Jacket', price: 159, imageUrl: 'src/images/apparel/IMG_7830.jpg', category: 'Outerwear', color: 'White', size: 'L' },
  { id: '8', name: 'Button Down Shirt', price: 129, imageUrl: 'src/images/apparel/IMG_8096.jpg', category: 'Tops', color: 'White', size: 'M' },
  { id: '9', name: 'Black Overall Dress', price: 149, imageUrl: 'src/images/apparel/IMG_8190.jpg', category: 'Dresses', color: 'Black', size: 'M', soldOut: true },
  { id: '10', name: 'White Summer Dress', price: 159, imageUrl: 'src/images/apparel/IMG_8376_1.jpg', category: 'Dresses', color: 'White', size: 'S' },
  { id: '11', name: 'Linen Wide Leg Pants', price: 129, imageUrl: 'src/images/apparel/IMG_7251.jpg', category: 'Pants', color: 'White', size: 'M' },
  { id: '12', name: 'Oversized Linen Shirt', price: 119, imageUrl: 'src/images/apparel/IMG_7282.jpg', category: 'Tops', color: 'White', size: 'L' },
];

// Mock Filter Options
export const filterOptions: FilterOptions = {
  categories: ['All Item', 'Tops', 'Pants', 'Shorts', 'Dresses', 'Outerwear'],
  colors: ['Any color', 'White', 'Black', 'Dark Blue', 'Light Blue', 'Beige', 'Khaki', 'Sage'],
  sizes: ['Any Size', 'S', 'M', 'L', 'XL'],
  priceRange: {
    min: 39,
    max: 238
  }
};

// Mock API calls
export const fetchProducts = async (
  category?: string,
  color?: string,
  size?: string,
  priceRange?: [number, number],
  sortBy?: string
): Promise<ProductsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter products
  let filteredProducts = [...mockProducts];
  
  if (category && category !== 'All Item') {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  if (color && color !== 'Any color') {
    filteredProducts = filteredProducts.filter(p => p.color === color);
  }
  
  if (size && size !== 'Any Size') {
    filteredProducts = filteredProducts.filter(p => p.size === size);
  }
  
  if (priceRange) {
    filteredProducts = filteredProducts.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }
  
  // Sort products
  if (sortBy) {
    if (sortBy === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    // For 'latest', no sorting needed as we assume they're already in latest order
  }
  
  return {
    products: filteredProducts,
    totalCount: filteredProducts.length
  };
};

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return filterOptions;
};