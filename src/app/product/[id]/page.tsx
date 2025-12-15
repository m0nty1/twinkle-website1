"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';
import { DataService } from '../../../services/dataService';
import { Product } from '../../../lib/types';
import { ProductImage } from '../../../components/ProductImage';

export default function ProductDetails() {
  const params = useParams();
  const id = params.id as string;
  const { t, addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = DataService.getProducts();
    setProduct(products.find(p => p.id === id) || null);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-cream min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="aspect-[4/5] bg-sand-50 rounded-t-[100px] overflow-hidden">
           <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
        </div>
        <div className="flex flex-col justify-center">
           <h1 className="text-4xl font-serif text-charcoal-900 mb-6">{product.title}</h1>
           <p className="text-2xl font-light text-charcoal-600 mb-8">{product.price} EGP</p>
           <p className="text-charcoal-600 mb-10 leading-relaxed font-light">{product.description}</p>
           <button onClick={() => addToCart(product, 1)} className="w-full py-4 bg-charcoal-900 text-cream uppercase tracking-[0.2em] font-bold">Add to Bag</button>
        </div>
      </div>
    </div>
  );
}