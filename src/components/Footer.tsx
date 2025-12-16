"use client";
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-24">
          <div className="md:w-1/3">
             <h2 className="text-4xl font-serif mb-6 tracking-wider">TWINKLE</h2>
             <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
               Defining modern luxury in Egypt. We curate scents and artifacts that resonate with your inner brilliance.
             </p>
          </div>
          <div className="flex gap-16 md:gap-24">
             <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Shop</h4>
                <Link to="/shop?cat=PERFUME" className="text-sm hover:text-accent transition-colors">Perfumes</Link>
                <Link to="/accessories" className="text-sm hover:text-accent transition-colors">Accessories</Link>
                <Link to="/shop" className="text-sm hover:text-accent transition-colors">New Arrivals</Link>
             </div>
             <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Company</h4>
                <Link to="#" className="text-sm hover:text-accent transition-colors">About</Link>
                <Link to="#" className="text-sm hover:text-accent transition-colors">Contact</Link>
                <Link to="/admin" className="text-sm hover:text-accent transition-colors">Admin</Link>
             </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 uppercase tracking-widest gap-4">
           <p>© 2024 Twinkle Egypt.</p>
           <div className="flex gap-6">
              <span>Instagram</span>
              <span>Facebook</span>
           </div>
        </div>
      </div>
    </footer>
  );
};
