"use client";
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const { t, toggleLanguage, cart } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we are on home page for transparency
  const isHome = location.pathname === '/';
  
  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled || !isHome || isMenuOpen ? 'bg-white text-primary shadow-sm py-4' : 'bg-transparent text-primary py-6'
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          
          {/* Left: Mobile Menu / Desktop Links */}
          <div className="flex items-center flex-1">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 -ml-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-[0.15em]">
              <Link to="/shop?cat=PERFUME" className="hover:text-accent transition-colors">Perfumes</Link>
              <Link to="/accessories" className="hover:text-accent transition-colors">Accessories</Link>
              <Link to="/shop" className="hover:text-accent transition-colors">Collections</Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="text-3xl font-serif tracking-[0.1em] font-bold">
              TWINKLE
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center justify-end flex-1 gap-4 md:gap-6">
            <button onClick={toggleLanguage} className="hidden md:block text-xs font-bold uppercase hover:text-accent">
              {t.language}
            </button>
            <Link to="/ai-chat" className="hidden md:block text-xs font-bold uppercase hover:text-accent border-b border-transparent hover:border-accent">
              AI Advisor
            </Link>
            <Link to="/admin" className="p-1 hover:text-accent"><User size={20} strokeWidth={1.5}/></Link>
            <Link to="/cart" className="p-1 hover:text-accent relative">
              <ShoppingBag size={20} strokeWidth={1.5}/>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-accent rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white h-[calc(100vh-80px)] border-t border-zinc-100 p-8 flex flex-col gap-6 animate-fade-in lg:hidden">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif">Home</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif">Shop All</Link>
          <Link to="/shop?cat=PERFUME" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif">Perfumes</Link>
          <Link to="/accessories" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif">Accessories</Link>
          <Link to="/ai-chat" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif text-accent">AI Advisor</Link>
          <div className="mt-auto pt-8 border-t border-zinc-100 flex justify-between items-center text-sm text-zinc-500">
             <button onClick={toggleLanguage}>{t.language}</button>
             <Link to="/login">Admin Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
