import React from 'react';
import { Card } from 'antd';
import styled from 'styled-components';
import { Product } from '../../../types/product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  position: relative;
  border: none;
  border-radius: 0;
  box-shadow: none;
  
  .ant-card-body {
    padding: 14px 20px !important;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s;
  }
  
  &:hover .product-image {
    opacity: 0.8;
  }
  
  .product-name {
    font-size: 14px;
    margin-bottom: 4px;
    color: #333;
  }
  
  .product-price {
    font-size: 14px;
    font-weight: 500;
  }
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 2px;
`;

const ProductCardComponent: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const viewProductDetails = (product: any) => {
    console.log('product', product);
    navigate(`/product-details/${product.id}`);
  };

  return (
    <StyledCard
      onClick={() => { viewProductDetails(product) }}
      cover={
        <div style={{ position: 'relative' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-image"
          />
          {product.soldOut && <SoldOutBadge>SOLD OUT</SoldOutBadge>}
        </div>
      }
      hoverable
    >
      <div className="product-name">{product.name}</div>
      <div className="product-price">RM {product.price.toFixed(2)}</div>
    </StyledCard>
  );
};

export default ProductCardComponent;