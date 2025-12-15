"use client";
import Link from 'next/link';
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useAppContext();
  return (
    <footer className="bg-sand-100 text-charcoal-800 pt-16 pb-8 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-3xl font-serif text-charcoal-900 mb-4 tracking-widest">TWINKLE</h3>
            <p className="text-charcoal-600 text-sm font-light">Where elegance meets everyday style.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">{t.shop}</h4>
            <ul className="space-y-3 text-charcoal-600 text-sm font-light">
              <li><Link href="/shop?cat=perfume">Perfumes</Link></li>
              <li><Link href="/shop?cat=accessory">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">Support</h4>
             <ul className="space-y-3 text-charcoal-600 text-sm font-light">
              <li>Contact</li>
              <li>Shipping</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-sand-200 text-center text-charcoal-500 text-[10px] uppercase tracking-wider">
          {t.footerText}
        </div>
      </div>
    </footer>
  );
};