"use client";
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import { ShoppingBag, Menu, X, User, LogOut, Heart } from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Navbar: React.FC = () => {
  const { t, toggleLanguage, cart, user, setUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => { setUser(null); router.push('/'); };

  return (
    <>
      <div className="bg-sand-100 text-charcoal-800 py-2 text-center text-[11px] uppercase tracking-[0.2em] font-medium border-b border-sand-200">
        Free Shipping on Orders over 1500 EGP
      </div>
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={24} /></button></div>
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
              <Link href="/" className="flex flex-col items-center group">
                <span className="text-3xl font-serif font-normal text-charcoal-900 tracking-[0.15em] group-hover:text-champagne-500">TWINKLE</span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-600">Perfume & Co</span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-10 items-center justify-center flex-1">
              <Link href="/" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium">{t.home}</Link>
              <Link href="/shop" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium">{t.shop}</Link>
              <Link href="/ai-chat" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium">Twinkle AI</Link>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={toggleLanguage} className="text-xs font-serif text-charcoal-800">{t.language}</button>
              {user ? (
                 <button onClick={() => router.push('/admin')} className="p-2"><User size={20}/></button>
              ) : (
                <Link href="/login" className="p-2"><User size={20}/></Link>
              )}
              <Link href="/cart" className="p-2 relative">
                <ShoppingBag size={20}/>
                {cartCount > 0 && <span className="absolute top-1 right-0 w-4 h-4 text-[9px] font-bold text-white bg-champagne-400 rounded-full flex items-center justify-center">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};