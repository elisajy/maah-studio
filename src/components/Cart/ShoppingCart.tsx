import React, { useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import './CartButton.scss';
import './ShoppingCart.scss';
import { Typography } from 'antd';

interface ShoppingCartComponentProps {
  isOpen: boolean;
  onClose: () => void;
}
const { Title, Text, Paragraph } = Typography;

// Mock product data
const mockProducts: any[] = [];
// const mockProducts = [
//   {
//     id: '1',
//     name: 'Wireless Bluetooth Headphones',
//     price: 89.99,
//     image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&crop=center',
//     quantity: 2
//   },
//   {
//     id: '2',
//     name: 'Smartphone Case',
//     price: 24.99,
//     image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=200&h=200&fit=crop&crop=center',
//     quantity: 1
//   },
//   {
//     id: '3',
//     name: 'USB-C Charging Cable',
//     price: 15.99,
//     image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center',
//     quantity: 3
//   },
//   {
//     id: '4',
//     name: 'Portable Power Bank',
//     price: 45.50,
//     image: 'https://images.unsplash.com/photo-1609592806451-0e26e5b1aa3d?w=200&h=200&fit=crop&crop=center',
//     quantity: 1
//   }
// ];

const ShoppingCartComponent: React.FC<ShoppingCartComponentProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    addToCart // Assuming this method exists in your CartContext
  } = useCart();

  // Add mock products to cart when component mounts (for testing purposes)
  useEffect(() => {
    // Only add mock data if cart is empty
    if (cartItems.length === 0) {
      mockProducts.forEach(product => {
        // If addToCart method exists, use it
        if (addToCart) {
          for (let i = 0; i < product.quantity; i++) {
            addToCart(product);
          }
        }
      });
    }
  }, [cartItems.length, addToCart]);

  const handleDecrease = (id: string, quantity: number) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleIncrease = (id: string, quantity: number) => {
    updateQuantity(id, quantity + 1);
  };

  const handleWhatsAppCheckout = () => {
    const message = cartItems.map(item =>
      `*${item.name}* x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const total = getTotalPrice().toFixed(2);
    const whatsappMessage = `Hello, I'd like to order:%0A%0A${message}%0A%0A*Total: $${total}*%0A%0AThank you!`;

    // Replace with your actual WhatsApp number (include country code without +)
    const phoneNumber = '+601111660611'; // Change this to your actual number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // Alternative method to manually add mock data (you can call this from browser console)
  const addMockData = () => {
    if (addToCart) {
      mockProducts.forEach(product => {
        for (let i = 0; i < product.quantity; i++) {
          addToCart(product);
        }
      });
    }
  };

  // Expose function to window for testing
  useEffect(() => {
    (window as any).addMockCartData = addMockData;
    return () => {
      delete (window as any).addMockCartData;
    };
  }, [addToCart]);

  return (
    <div className={`shopping-cart-container ${isOpen ? 'open' : ''}`}>
      <div className="shopping-cart-overlay" onClick={onClose}></div>

      <div className="shopping-cart-drawer">
        <div className="cart-header">
          <Title level={2} className="cart-title">
            Your Shopping Cart
          </Title>
          <button className="close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <Trash2 size={48} />
              <p>Your cart is empty.</p>
              <button
                onClick={addMockData}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#1890ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add Sample Products
              </button>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="item-controls">
                  <div className="quantity-control">
                    <button onClick={() => handleDecrease(item.id, item.quantity)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item.id, item.quantity)}>+</button>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="checkout-button" onClick={handleWhatsAppCheckout}>
                Checkout with WhatsApp
              </button>
              <button className="continue-shopping" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartComponent;