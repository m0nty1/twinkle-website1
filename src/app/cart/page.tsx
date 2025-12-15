"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, addToCart, t } = useAppContext();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
        <Link href="/shop" className="text-champagne-500 underline hover:text-champagne-600">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-serif mb-8 text-center">{t.cart}</h1>
      <div className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="flex items-center p-4 border-b border-gray-100 last:border-0">
            <div className="w-20 h-20 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
               <ProductImage src={item.images[0]} alt={item.title} category={item.category} />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-medium text-charcoal-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.price} EGP</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded">
                <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1} className="p-1 hover:bg-gray-50 disabled:opacity-50"><Minus size={14} /></button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button onClick={() => addToCart(item, 1)} disabled={item.quantity >= item.stock} className="p-1 hover:bg-gray-50 disabled:opacity-50"><Plus size={14} /></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end">
        <div className="flex justify-between w-full md:w-1/3 text-xl font-bold mb-6 border-t pt-4"><span>{t.total}</span><span>{total} EGP</span></div>
        <button onClick={() => router.push('/checkout')} className="w-full md:w-auto px-8 py-3 bg-champagne-500 text-white font-bold uppercase tracking-widest hover:bg-champagne-600 transition">{t.checkout}</button>
      </div>
    </div>
  );
}