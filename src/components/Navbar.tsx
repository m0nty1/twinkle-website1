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
            
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-charcoal-800 hover:text-champagne-500 transition">
                {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
              <Link href="/" className="flex flex-col items-center group">
                <span className="text-3xl font-serif font-normal text-charcoal-900 tracking-[0.15em] group-hover:text-champagne-500 transition duration-300">
                  TWINKLE
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-600">Perfume & Co</span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-10 rtl:space-x-reverse items-center justify-center flex-1">
              <Link href="/" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.home}</Link>
              <Link href="/shop" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.shop}</Link>
              <Link href="/shop?cat=perfume" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.perfumes}</Link>
              <Link href="/ai-chat" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300 flex items-center gap-1">
                 Twinkle AI
              </Link>
            </div>

            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button 
                onClick={toggleLanguage} 
                className="text-xs font-serif text-charcoal-800 hover:text-champagne-500 px-2"
              >
                {t.language}
              </button>
              
              {user ? (
                 <div className="relative group">
                   <button onClick={() => router.push('/admin')} className="p-2 text-charcoal-800 hover:text-champagne-500 transition">
                     <User size={20} strokeWidth={1.5} />
                   </button>
                   <div className="absolute right-0 mt-4 w-48 bg-cream border border-sand-200 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                      <div className="px-4 py-3 text-xs text-charcoal-600 border-b border-sand-100 tracking-wide">Hi, {user.name}</div>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs text-red-500 hover:bg-sand-50 flex items-center gap-2 uppercase tracking-wide">
                        <LogOut size={12}/> Logout
                      </button>
                   </div>
                 </div>
              ) : (
                <Link href="/login" className="p-2 hidden md:block text-charcoal-800 hover:text-champagne-500 transition">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              <button className="p-2 hidden md:block text-charcoal-800 hover:text-champagne-500 transition">
                 <Heart size={20} strokeWidth={1.5} />
              </button>

              <Link href="/cart" className="p-2 text-charcoal-800 hover:text-champagne-500 transition relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold leading-none text-white bg-champagne-400 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-cream border-t border-sand-100 absolute w-full left-0 z-40 shadow-xl">
            <div className="py-6 space-y-4 flex flex-col items-center">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.home}</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.shop}</Link>
              <Link href="/shop?cat=perfume" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.perfumes}</Link>
              <Link href="/ai-chat" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">Twinkle AI</Link>
              {!user && <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">Login</Link>}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};