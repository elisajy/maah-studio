import React from 'react';
import './ProductItem.scss';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ProductItemProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
    return (
        <div className="product-item">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button
                        className="add-to-cart-button"
                        onClick={() => onAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;