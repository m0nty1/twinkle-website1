"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import { DataService } from '../services/dataService';
import { Product } from '../lib/types';
import { ArrowRight, Gem, Truck, ShieldCheck, Star } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

export default function Home() {
  const { t } = useAppContext();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    const products = DataService.getProducts();
    setFeatured(products.filter(p => p.isFeatured || p.price > 1000).slice(0, 4));
  }, []);

  return (
    <div className="bg-cream">
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-sand-50 to-champagne-100 opacity-60"></div>
        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-start order-2 md:order-1">
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.3em] text-champagne-500 uppercase">New Collection</span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-charcoal-900 mb-6">{t.heroTitle}</h1>
            <p className="text-charcoal-600 text-lg font-light mb-10">{t.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/shop" className="px-10 py-4 bg-charcoal-900 text-cream text-xs font-bold uppercase tracking-[0.2em] rounded-sm">{t.shop}</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
             <div className="relative w-full max-w-md aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop" className="w-full h-full object-cover shadow-2xl rounded-t-[10rem] z-10 relative" alt="Twinkle Hero" />
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-charcoal-900 italic mb-12">{t.bestSellers}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map(product => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                <div className="aspect-[4/5] bg-white overflow-hidden relative mb-4 shadow-sm">
                  <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                </div>
                <h3 className="text-sm font-medium text-charcoal-900 truncate font-serif">{product.title}</h3>
                <p className="text-champagne-500 text-sm font-medium mt-1">{product.price} EGP</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}