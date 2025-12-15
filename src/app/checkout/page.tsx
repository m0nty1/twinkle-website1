"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import { GOVERNORATES } from '../../lib/constants';
import { DataService } from '../../services/dataService';
import { OrderStatus } from '../../lib/types';

export default function Checkout() {
  const { cart, clearCart, t } = useAppContext();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', governorate: 'Cairo', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const grandTotal = total + (total > 1500 ? 0 : 50);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    await DataService.createOrder({
      id: orderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      governorate: formData.governorate,
      notes: formData.notes,
      items: cart,
      total: grandTotal,
      status: OrderStatus.PENDING,
      date: new Date().toISOString()
    });
    alert(t.orderSuccessMsg);
    clearCart();
    router.push('/');
    setIsSubmitting(false);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">{t.shippingInfo}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Full Name" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required placeholder="Phone Number" type="tel" className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <select className="w-full border p-2 rounded" value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})}>
                {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <textarea required placeholder="Detailed Address" className="w-full border p-2 rounded" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            <button type="submit" disabled={isSubmitting} className="w-full bg-charcoal-900 text-white py-3 font-bold uppercase tracking-widest mt-6 disabled:opacity-50">{isSubmitting ? 'Processing...' : t.placeOrder}</button>
          </form>
        </div>
        <div className="bg-gray-50 p-6 rounded h-fit">
          <h3 className="font-bold mb-4 border-b pb-2">Order Summary</h3>
          <div className="space-y-3 mb-4">{cart.map(item => <div key={item.id} className="flex justify-between text-sm"><span>{item.title} x {item.quantity}</span><span>{item.price * item.quantity} EGP</span></div>)}</div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t"><span>Total</span><span>{grandTotal} EGP</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}