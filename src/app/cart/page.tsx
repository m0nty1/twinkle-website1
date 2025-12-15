"use client";
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ProductImage } from '../../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, t } = useAppContext();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-serif mb-8 text-center">{t.cart}</h1>
      <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b border-gray-100">
            <div className="w-20 h-20 bg-gray-100 flex-shrink-0"><ProductImage src={item.images[0]} alt={item.title} category={item.category}/></div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-charcoal-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.price} EGP</p>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-400 p-2"><Trash2 size={18} /></button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end">
        <div className="text-xl font-bold mb-6">Total: {total} EGP</div>
        <Link href="/checkout" className="px-8 py-3 bg-champagne-500 text-white font-bold uppercase tracking-widest">Checkout</Link>
      </div>
    </div>
  );
}