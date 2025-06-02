import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import ShoppingCartComponent from './ShoppingCart';
import './CartButton.scss';

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount = 0 }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <button className="cart-button" onClick={openCart} aria-label="Shopping Cart">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="cart-count">{itemCount > 99 ? '99+' : itemCount}</span>
        )}
      </button>

      <ShoppingCartComponent isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default CartButton;