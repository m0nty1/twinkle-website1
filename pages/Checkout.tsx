import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { GOVERNORATES } from '../constants';
import { DataService } from '../services/dataService';
import { OrderStatus } from '../types';

const Checkout: React.FC = () => {
  const { cart, clearCart, t, isRTL } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    governorate: 'Cairo',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 1500 ? 0 : 50; // Simple shipping logic
  const grandTotal = total + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    // Save Order Mock
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

    // Create WhatsApp Message
    const itemsList = cart.map(i => `- ${i.title} (x${i.quantity})`).join('%0a');
    const msg = `*New Order: ${orderId}*%0a%0aName: ${formData.name}%0aPhone: ${formData.phone}%0aAddr: ${formData.governorate}, ${formData.address}%0a%0a*Items:*%0a${itemsList}%0a%0a*Total: ${grandTotal} EGP* (COD)`;
    
    // In a real app, you might redirect to a success page first, then show the WA button
    const waLink = `https://wa.me/201000000000?text=${msg}`;
    
    alert(t.orderSuccessMsg);
    window.open(waLink, '_blank');
    
    clearCart();
    navigate('/');
    setIsSubmitting(false);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Form */}
        <div>
          <h2 className="text-xl font-bold mb-6">{t.shippingInfo}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input required type="text" className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input required type="tel" className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Governorate</label>
              <select className="w-full border p-2 rounded" value={formData.governorate} onChange={e => setFormData({...formData, governorate: e.target.value})}>
                {GOVERNORATES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Detailed Address</label>
              <textarea required className="w-full border p-2 rounded" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            <div>
               <label className="block text-sm text-gray-600 mb-1">Notes (Optional)</label>
               <input type="text" className="w-full border p-2 rounded" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-dark-900 text-white py-3 font-bold uppercase tracking-widest hover:bg-gold-600 transition mt-6 disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : t.placeOrder}
            </button>
          </form>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded h-fit">
          <h3 className="font-bold mb-4 border-b pb-2">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} x {item.quantity}</span>
                <span>{item.price * item.quantity} EGP</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
               <span>Subtotal</span>
               <span>{total} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
               <span>Shipping</span>
               <span>{shipping === 0 ? 'Free' : `${shipping} EGP`}</span>
            </div>
            <div className="flex justify-between text-xl font-bold mt-2 pt-2 border-t">
               <span>Total</span>
               <span>{grandTotal} EGP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;