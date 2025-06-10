import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Select, 
  Slider, 
  Button, 
  Drawer, 
  Space, 
  Radio, 
  Spin,
  message
} from 'antd';
import { 
  FilterOutlined, 
  AppstoreOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import ProductCard from '../../components/Product/ProductCard/ProductCard';
import { fetchProducts, fetchFilterOptions } from '../../services/ProductService';
import { Product, FilterState } from '../../types/product';
import './ProductListingPage.scss';

// Styled Components
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    
    .right-filters {
      margin-top: 16px;
      width: 100%;
      justify-content: space-between;
    }
  }
`;

const FiltersLeft = styled.div`
  display: flex;
  align-items: center;
`;

const FiltersRight = styled.div`
  display: flex;
  align-items: center;
  
  .grid-controls {
    display: flex;
    margin-left: 16px;
  }
`;

const ProductCount = styled.span`
  color: #888;
  margin-left: 8px;
  font-size: 14px;
`;

const DrawerFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 16px;
  border-top: 1px solid #e8e8e8;
  background: white;
  left: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const EmptyResults = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #888;
  font-size: 16px;
`;

const ProductListingPage: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mobileFilterVisible, setMobileFilterVisible] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<number>(4);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Item',
    color: 'Any color',
    size: 'Any Size',
    priceRange: [39, 238]
  });

  const [filterOptions, setFilterOptions] = useState({
    categories: ['All Item'],
    colors: ['Any color'],
    sizes: ['Any Size'],
    priceRange: {
      min: 39,
      max: 238
    }
  });
  
  // Effects
  // Fetch filter options on component mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Failed to load filter options:', error);
        message.error('Failed to load filter options');
      }
    };
    
    loadFilterOptions();
  }, []);
  
  // Fetch products when filters or sorting changes
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { products: fetchedProducts } = await fetchProducts(
          filters.category,
          filters.color,
          filters.size,
          filters.priceRange,
          sortBy
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        message.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [filters, sortBy]);
  
  // Responsive grid columns
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setGridCols(2); // Mobile
      } else if (width < 992) {
        setGridCols(3); // Tablet
      } else {
        setGridCols(4); // Desktop default
      }
    };
    
    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handlers
  const handleShowMobileFilter = () => {
    setMobileFilterVisible(true);
  };
  
  const handleCloseMobileFilter = () => {
    setMobileFilterVisible(false);
  };
  
  const handleChangeGridView = (cols: number) => {
    setGridCols(cols);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const handleApplyFilters = () => {
    // Just close the drawer - filters are applied in real time
    setMobileFilterVisible(false);
  };
  
  const handleResetFilters = () => {
    setFilters({
      category: 'All Item',
      color: 'Any color',
      size: 'Any Size',
      priceRange: [filterOptions.priceRange.min, filterOptions.priceRange.max]
    });
  };
  
  const renderProductGrid = () => {
    if (loading) {
      return (
        <LoadingContainer>
          <Spin size="large" />
        </LoadingContainer>
      );
    }
    
    if (products.length === 0) {
      return <EmptyResults>No products found matching your criteria</EmptyResults>;
    }
    
    return (
      <Row gutter={[16, 24]}>
        {products.map(product => (
          <Col 
            key={product.id} 
            xs={24 / Math.min(gridCols, 2)} 
            sm={24 / Math.min(gridCols, 3)} 
            md={24 / gridCols}
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  };
  
  const renderFilters = () => {
    return (
      <FilterContainer>
        <FiltersLeft>
          <Select 
            value={sortBy} 
            onChange={handleSortChange}
            style={{ width: 160 }}
            options={[
              { value: 'latest', label: 'Sort by latest' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
            ]}
          />
          <ProductCount>{products.length} products</ProductCount>
        </FiltersLeft>
        
        <FiltersRight className="right-filters">
          <Button 
            icon={<FilterOutlined />} 
            onClick={handleShowMobileFilter}
          >
            Filter
          </Button>
          
          <div className="grid-controls">
            <Radio.Group 
              value={gridCols} 
              onChange={(e) => handleChangeGridView(e.target.value)}
            >
              <Radio.Button value={4}>
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value={5}>
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value={6}>
                <AppstoreOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        </FiltersRight>
      </FilterContainer>
    );
  };
  
  const renderMobileFilterDrawer = () => {
    return (
      <Drawer
        title="Filter"
        placement="right"
        onClose={handleCloseMobileFilter}
        open={mobileFilterVisible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <DrawerFooter>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button onClick={handleResetFilters}>Reset</Button>
              <Button type="primary" onClick={handleApplyFilters}>
                Apply
              </Button>
            </Space>
          </DrawerFooter>
        }
      >
        <div>
          <h4>Category</h4>
          <Select
            style={{ width: '100%', marginBottom: 24 }}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
            options={filterOptions.categories.map(cat => ({ value: cat, label: cat }))}
          />
          
          <h4>Color</h4>
          <Select
            style={{ width: '100%', marginBottom: 24 }}
            value={filters.color}
            onChange={(value) => handleFilterChange('color', value)}
            options={filterOptions.colors.map(color => ({ value: color, label: color }))}
          />
          
          <h4>Size</h4>
          <Select
            style={{ width: '100%', marginBottom: 24 }}
            value={filters.size}
            onChange={(value) => handleFilterChange('size', value)}
            options={filterOptions.sizes.map(size => ({ value: size, label: size }))}
          />
          
          <h4>Price</h4>
          <Slider
            range
            min={filterOptions.priceRange.min}
            max={filterOptions.priceRange.max}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value as [number, number])}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span>RM{filters.priceRange[0]}</span>
            <span>RM{filters.priceRange[1]}</span>
          </div>
        </div>
      </Drawer>
    );
  };
  
  return (
    <div className="product-listing-container">
      {renderFilters()}
      {renderProductGrid()}
      {renderMobileFilterDrawer()}
    </div>
  );
};

export default ProductListingPage;