"use client";
import Link from 'next/link';
import React from 'react';
import { useAppContext } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useAppContext();
  return (
    <footer className="bg-sand-100 text-charcoal-800 pt-16 pb-8 border-t border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left rtl:md:text-right">
          <div className="flex flex-col items-center md:items-start rtl:md:items-end">
            <h3 className="text-3xl font-serif text-charcoal-900 mb-4 tracking-widest">TWINKLE</h3>
            <p className="text-charcoal-600 text-sm leading-relaxed max-w-xs font-light">
              Where elegance meets everyday style. Premium scents and accessories curated for the modern muse.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">{t.shop}</h4>
            <ul className="space-y-3 text-charcoal-600 text-sm font-light">
              <li><Link href="/shop?cat=perfume" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">{t.perfumes}</Link></li>
              <li><Link href="/shop?cat=accessory" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">{t.accessories}</Link></li>
              <li><Link href="/shop?cat=bundle" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">Bundles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">Support</h4>
             <ul className="space-y-3 text-charcoal-600 text-sm font-light">
              <li>Contact</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">Social</h4>
            <div className="flex justify-center md:justify-start rtl:md:justify-end space-x-6 rtl:space-x-reverse">
              <span className="text-charcoal-600">Instagram</span>
              <span className="text-charcoal-600">Facebook</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-sand-200 text-center text-charcoal-500 text-[10px] uppercase tracking-wider">
          {t.footerText}
        </div>
      </div>
    </footer>
  );
};