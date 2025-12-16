"use client";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { GOVERNORATES } from '../../lib/constants';
import { DataService } from '../../services/dataService';
import { OrderStatus } from '../../lib/types';

export default function Checkout() {
  const { cart, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', governorate: 'Cairo', notes: '' });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 1500 ? 0 : 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    await DataService.createOrder({
      id: orderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      governorate: formData.governorate,
      notes: formData.notes,
      items: cart,
      total: total + shipping,
      status: OrderStatus.PENDING,
      date: new Date().toISOString()
    });
    alert('Order successfully placed.');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) return null;

  return (
    <div className="pt-32 min-h-screen px-6 md:px-12 max-w-6xl mx-auto mb-24">
       <h1 className="text-4xl font-serif mb-12">Checkout</h1>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <form onSubmit={handleSubmit} className="space-y-6">
             <h2 className="text-sm font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-6">Shipping Details</h2>
             <div className="space-y-4">
               <input required placeholder="Full Name" className="w-full bg-zinc-50 border-none p-4 text-sm focus:ring-1 focus:ring-primary" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
               <input required placeholder="Phone" className="w-full bg-zinc-50 border-none p-4 text-sm focus:ring-1 focus:ring-primary" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
               <select className="w-full bg-zinc-50 border-none p-4 text-sm focus:ring-1 focus:ring-primary" value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})}>
                 {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
               </select>
               <textarea required placeholder="Detailed Address" rows={3} className="w-full bg-zinc-50 border-none p-4 text-sm focus:ring-1 focus:ring-primary" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
             </div>
             <button disabled={loading} type="submit" className="w-full bg-primary text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent mt-8">
               {loading ? 'Processing...' : 'Place Order'}
             </button>
          </form>

          <div className="bg-zinc-50 p-8 h-fit">
             <h2 className="text-sm font-bold uppercase tracking-widest border-b border-zinc-200 pb-2 mb-6">Order Summary</h2>
             <div className="space-y-4 mb-6">
                {cart.map(item => (
                   <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} <span className="text-zinc-400">x{item.quantity}</span></span>
                      <span>{item.price * item.quantity} EGP</span>
                   </div>
                ))}
             </div>
             <div className="border-t border-zinc-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-zinc-500"><span>Subtotal</span><span>{total} EGP</span></div>
                <div className="flex justify-between text-sm text-zinc-500"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `${shipping} EGP`}</span></div>
                <div className="flex justify-between text-xl font-serif pt-4 border-t border-zinc-200 mt-2"><span>Total</span><span>{total + shipping} EGP</span></div>
             </div>
          </div>
       </div>
    </div>
  );
}
