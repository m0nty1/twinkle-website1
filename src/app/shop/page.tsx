"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { Product, ProductCategory } from '../../lib/types';
import { ProductImage } from '../../components/ProductImage';

export default function Shop() {
  const { t } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');

  useEffect(() => { setProducts(DataService.getProducts()); }, []);

  const filtered = products.filter(p => {
    if (!catParam) return true;
    if (catParam.toUpperCase().includes('PERFUME')) return p.category === ProductCategory.PERFUME;
    if (catParam.toUpperCase().includes('ACCESSORY')) return p.category === ProductCategory.ACCESSORY;
    return true;
  });

  return (
    <div className="bg-cream min-h-screen py-12 px-4">
       <div className="max-w-7xl mx-auto">
         <h1 className="text-3xl font-serif text-charcoal-900 italic mb-10">Shop Collection</h1>
         <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                <div className="aspect-[4/5] bg-white overflow-hidden relative mb-4 shadow-sm">
                  <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                </div>
                <div className="text-center">
                   <h3 className="font-serif text-lg text-charcoal-900 truncate">{product.title}</h3>
                   <span className="text-charcoal-600 text-sm font-medium">{product.price} EGP</span>
                </div>
              </Link>
            ))}
         </div>
       </div>
    </div>
  );
}