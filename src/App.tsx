import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TRANSLATIONS } from './lib/constants';
import { Language, CartItem, Product, User } from './lib/types';
import Layout from './components/Layout';

// Pages
import Home from './app/page';
import Shop from './app/shop/page';
import ProductDetails from './app/product/[id]/page';
import Cart from './app/cart/page';
import Checkout from './app/checkout/page';
import AdminDashboard from './app/admin/page';
import Login from './app/login/page';
import AIChatPage from './app/ai-chat/page';
import Accessories from './app/accessories/page';

// --- Contexts ---

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

// --- Helper Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useAppContext();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// --- Main App Component ---

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en'); // Default English
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <AppContext.Provider value={{ 
      language, toggleLanguage, 
      cart, addToCart, removeFromCart, clearCart, 
      user, setUser, 
      t, isRTL 
    }}>
      <BrowserRouter>
        <ScrollToTop />
        <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-sans'}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="login" element={<Login />} />
              <Route path="ai-chat" element={<AIChatPage />} />
              <Route path="admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;