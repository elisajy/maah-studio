// src/hooks/useProductFiltering.ts
import { useState, useEffect } from 'react';
import { Product, FilterOptions, SortOption } from '../types/product';

interface UseProductFiltering {
  filteredProducts: Product[];
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  applyFilters: () => void;
}

export const useProductFiltering = (products: Product[]): UseProductFiltering => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'All Item',
    color: 'Any color',
    size: 'Any Size',
    priceRange: [39, 238],
  });

  // Apply filters
  const applyFilters = () => {
    let filtered = [...products];
    
    // Filter by category
    if (filterOptions.category !== 'All Item') {
      filtered = filtered.filter(p => p.category === filterOptions.category);
    }
    
    // Filter by color
    if (filterOptions.color !== 'Any color') {
      filtered = filtered.filter(p => p.color === filterOptions.color);
    }
    
    // Filter by size
    if (filterOptions.size !== 'Any Size') {
      filtered = filtered.filter(p => p.size === filterOptions.size);
    }
    
    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= filterOptions.priceRange[0] && p.price <= filterOptions.priceRange[1]
    );
    
    setFilteredProducts(filtered);
  };

  // Sort products whenever sort option changes
  useEffect(() => {
    let sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'latest':
        // In a real app, you'd have a date field to sort by
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  }, [sortBy]);

  // Initial setup
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return {
    filteredProducts,
    filterOptions,
    setFilterOptions,
    sortBy,
    setSortBy,
    applyFilters,
  };
};

export default useProductFiltering;