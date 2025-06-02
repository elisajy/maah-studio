import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from './ProductItem';
import { CartItem } from './ShoppingCart';

// Define the shape of our cart state
interface CartState {
  items: CartItem[];
  itemCount: number;
  total: number;
}

// Define the actions we can perform on our cart
type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the context interface
interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Initial state
const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        // Item exists, increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        return {
          ...state,
          items: updatedItems,
          itemCount,
          total
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          image: action.payload.image
        };
        
        const updatedItems = [...state.items, newItem];
        const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
        const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        
        return {
          ...state,
          items: updatedItems,
          itemCount,
          total
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount,
        total
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity < 1) return state;
      
      const updatedItems = state.items.map(item => 
        item.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      );
      
      const itemCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
      const total = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      
      return {
        ...state,
        items: updatedItems,
        itemCount,
        total
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 