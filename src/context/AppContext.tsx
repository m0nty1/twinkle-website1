"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../lib/constants';
import { Language, CartItem, Product, User } from '../lib/types';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  t: (typeof TRANSLATIONS)['en'];
  isRTL: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const isRTL = language === 'ar';
  const t = TRANSLATIONS[language];

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <AppContext.Provider value={{ 
      language, toggleLanguage, 
      cart, addToCart, removeFromCart, clearCart, 
      user, setUser, 
      t, isRTL 
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};