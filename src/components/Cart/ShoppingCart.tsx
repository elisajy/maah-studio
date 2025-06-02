import React, { useState, useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from './CartContext';
import './ShoppingCart.scss';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity } = useCart();
  const { items, total } = state;

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.shopping-cart-drawer') && !target.closest('.cart-button')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={`shopping-cart-container ${isOpen ? 'open' : ''}`}>
      <div className="shopping-cart-overlay" onClick={onClose}></div>
      <div className="shopping-cart-drawer">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div className="cart-item" key={item.id}>
                  {item.image && (
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                  )}
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-item" onClick={() => removeItem(item.id)}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="shipping">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button className="checkout-button">Proceed to Checkout</button>
                <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartComponent;