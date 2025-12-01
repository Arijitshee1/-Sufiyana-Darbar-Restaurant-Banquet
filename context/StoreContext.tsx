import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, Order, Reservation, Stats } from '../types';
import { api } from '../services/data';

interface StoreContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Data State
  menu: MenuItem[];
  isLoadingMenu: boolean;
  refreshMenu: () => void;
  
  // Admin State (Mock)
  isAdmin: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load Menu on Mount
  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    setIsLoadingMenu(true);
    try {
      const data = await api.getMenu();
      setMenu(data);
    } catch (e) {
      console.error("Failed to load menu", e);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  // Cart Logic
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.id === itemId) {
          const newQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Admin Logic (Mock)
  const loginAdmin = (e: string, p: string) => {
    // Specific credentials as requested
    if (e === 'techarijit64@gmail.com' && p === 'Arijit@123') {
        setIsAdmin(true);
        return true;
    }
    return false;
  };

  const logoutAdmin = () => setIsAdmin(false);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      menu, isLoadingMenu, refreshMenu: loadMenu,
      isAdmin, loginAdmin, logoutAdmin
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};