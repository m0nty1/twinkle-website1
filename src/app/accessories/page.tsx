"use client";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataService } from '../../services/dataService';
import { Product, ProductCategory } from '../../lib/types';
import { ProductImage } from '../../components/ProductImage';

export default function Accessories() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const all = DataService.getProducts();
    setProducts(all.filter(p => p.category === ProductCategory.ACCESSORY));
  }, []);

  return (
    <div className="pt-24 min-h-screen">
       <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          {/* Editorial Header */}
          <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto">
             <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Adornments</span>
             <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-[0.9]">FINISHING <br/> TOUCHES</h1>
             <p className="text-zinc-500 leading-relaxed">
               Small details, massive impact. Explore our curated selection of gold-plated jewelry and statement pieces designed to catch the light.
             </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 mb-24">
             {products.map(product => (
               <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="aspect-square bg-zinc-100 overflow-hidden relative mb-6 rounded-full group-hover:rounded-none transition-all duration-700 ease-out">
                     <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                  </div>
                  <div className="text-center">
                     <h3 className="text-sm font-bold uppercase tracking-wide text-primary">{product.title}</h3>
                     <p className="text-xs text-zinc-400 mt-1 mb-2">{product.attributes?.material || 'Jewelry'}</p>
                     <span className="text-sm font-serif text-zinc-800 border-b border-zinc-200 pb-1">{product.price} EGP</span>
                  </div>
               </Link>
             ))}
          </div>
       </div>
    </div>
  );
}
