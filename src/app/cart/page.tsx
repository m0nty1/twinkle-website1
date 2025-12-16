"use client";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useAppContext();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) return (
    <div className="h-screen flex flex-col items-center justify-center">
       <h1 className="text-4xl font-serif mb-4">Your Bag is Empty</h1>
       <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-1">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="pt-32 min-h-screen px-6 md:px-12 max-w-5xl mx-auto">
       <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>
       
       <div className="space-y-8">
          {cart.map(item => (
             <div key={item.id} className="flex gap-6 border-b border-zinc-100 pb-8 items-center">
                <div className="w-24 h-32 bg-zinc-100 flex-shrink-0 overflow-hidden">
                   <ProductImage src={item.images[0]} alt={item.title} category={item.category} />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between mb-2">
                      <h3 className="font-bold uppercase tracking-wide text-sm">{item.title}</h3>
                      <span className="font-serif">{item.price * item.quantity} EGP</span>
                   </div>
                   <p className="text-xs text-zinc-500 mb-4">{item.category}</p>
                   
                   <div className="flex items-center gap-6">
                      <div className="flex items-center border border-zinc-200 px-2 py-1 gap-4">
                         <button onClick={() => addToCart(item, -1)} disabled={item.quantity <= 1}><Minus size={12}/></button>
                         <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                         <button onClick={() => addToCart(item, 1)} disabled={item.quantity >= item.stock}><Plus size={12}/></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-xs text-zinc-400 underline hover:text-red-500">Remove</button>
                   </div>
                </div>
             </div>
          ))}
       </div>

       <div className="mt-12 flex flex-col items-end">
          <div className="flex justify-between w-full md:w-1/2 text-xl font-serif border-b border-zinc-900 pb-4 mb-8">
             <span>Subtotal</span>
             <span>{total} EGP</span>
          </div>
          <p className="text-xs text-zinc-500 mb-8">Shipping and taxes calculated at checkout.</p>
          <button onClick={() => navigate('/checkout')} className="w-full md:w-auto bg-primary text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-colors">
             Checkout
          </button>
       </div>
    </div>
  );
}
