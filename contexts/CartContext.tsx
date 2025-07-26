import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { MenuItem } from '../data/menuItems';

type CartItem = {
  item: MenuItem;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  getTotalItems: () => number;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          items: updatedItems,
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { item: action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find((item) => item.item.id === action.payload);
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.item.id !== action.payload),
        total: state.total - (itemToRemove.item.price * itemToRemove.quantity),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        return state;
      }

      const itemIndex = state.items.findIndex((item) => item.item.id === id);
      if (itemIndex === -1) return state;

      const updatedItems = [...state.items];
      const oldQuantity = updatedItems[itemIndex].quantity;
      updatedItems[itemIndex].quantity = quantity;

      return {
        ...state,
        items: updatedItems,
        total: state.total + (updatedItems[itemIndex].item.price * (quantity - oldQuantity)),
      };
    }
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const removeFromCart = (itemId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch, 
      getTotalItems, 
      removeFromCart, 
      updateQuantity 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
