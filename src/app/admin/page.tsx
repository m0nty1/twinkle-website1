"use client";
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { AIService } from '../../services/aiService';
import { Product, Order, OrderStatus, ProductCategory, UserRole } from '../../lib/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit, Trash, CheckCircle, Package, Truck, XCircle, Wand2, Loader2, X } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export default function AdminDashboard() {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [importQueue, setImportQueue] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = () => {
    setProducts(DataService.getProducts());
    setOrders(DataService.getOrders());
    setMediaLibrary(DataService.getMediaLibrary());
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const newProduct: Product = {
      id: editingProduct.id || Date.now().toString(),
      title: editingProduct.title || '',
      description: editingProduct.description || '',
      price: Number(editingProduct.price) || 0,
      stock: Number(editingProduct.stock) || 0,
      category: editingProduct.category || ProductCategory.PERFUME,
      images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : ['/products/fallback.jpg'],
      attributes: editingProduct.attributes,
      brand: editingProduct.brand
    };
    await DataService.saveProduct(newProduct, user);
    setIsModalOpen(false);
    loadData();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!user || !window.confirm("Are you sure?")) return;
    await DataService.deleteProduct(id, user);
    loadData();
  };

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    if (!user) return;
    await DataService.updateOrderStatus(orderId, status, user);
    loadData();
  };

  const startSmartImport = async () => {
    setIsProcessing(true);
    const queue = [...importQueue];
    for (let i = 0; i < queue.length; i++) {
       const item = queue[i];
       if (item.status === 'matched') continue;
       queue[i].status = 'processing';
       setImportQueue([...queue]);
       await new Promise(r => setTimeout(r, 500)); 
       queue[i].status = 'error'; 
       setImportQueue([...queue]);
    }
    setIsProcessing(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImportQueue(Array.from(e.target.files).map(f => ({ file: f, status: 'pending' })));
  };

  if (!user) return <div className="p-8 text-center">Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <div className="p-6"><h2 className="text-xl font-bold">Admin Panel</h2></div>
        <nav className="mt-4">
           {['OVERVIEW', 'PRODUCTS', 'ORDERS', 'MEDIA', 'SMART_IMPORT'].map(tab => (
             <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-6 py-3 hover:bg-yellow-50 ${activeTab === tab ? 'border-r-4 border-yellow-500 bg-yellow-50 font-bold' : ''}`}>{tab.replace('_', ' ')}</button>
           ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
         {activeTab === 'OVERVIEW' && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded shadow-sm"><h3 className="font-bold text-gray-500">Revenue</h3><p className="text-3xl font-bold">{orders.reduce((a,b)=>a+b.total,0)} EGP</p></div>
              <div className="bg-white p-6 rounded shadow-sm"><h3 className="font-bold text-gray-500">Orders</h3><p className="text-3xl font-bold">{orders.length}</p></div>
              <div className="bg-white p-6 rounded shadow-sm h-80 col-span-3">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={Object.entries(orders.reduce((acc: any, o) => { acc[o.status] = (acc[o.status]||0)+1; return acc; }, {})).map(([name, count]) => ({name, count}))}>
                     <XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="count" fill="#D4AF37"/>
                   </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
         )}
         {activeTab === 'PRODUCTS' && (
           <div>
              <div className="flex justify-between mb-4"><h2 className="text-2xl font-bold">Products</h2><button onClick={() => { setEditingProduct({}); setIsModalOpen(true); }} className="bg-charcoal-900 text-white px-4 py-2 rounded"><Plus size={16}/> Add</button></div>
              <div className="bg-white rounded shadow overflow-x-auto">
                 <table className="w-full text-sm text-left">
                    <thead><tr className="border-b"><th className="p-4">Image</th><th className="p-4">Title</th><th className="p-4">Stock</th><th className="p-4">Price</th><th className="p-4">Actions</th></tr></thead>
                    <tbody>
                       {products.map(p => (
                         <tr key={p.id} className="border-b hover:bg-gray-50">
                            <td className="p-4"><div className="w-10 h-10"><ProductImage src={p.images[0]} alt={p.title} category={p.category}/></div></td>
                            <td className="p-4">{p.title}</td>
                            <td className={`p-4 font-bold ${p.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>{p.stock}</td>
                            <td className="p-4">{p.price}</td>
                            <td className="p-4 flex gap-2"><button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }}><Edit size={16}/></button><button onClick={() => handleDeleteProduct(p.id)} className="text-red-500"><Trash size={16}/></button></td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
         )}
         {activeTab === 'SMART_IMPORT' && (
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-bold mb-4 flex gap-2"><Wand2/> Smart Import</h2>
              <input type="file" multiple onChange={handleFileSelect} className="mb-4"/>
              <button onClick={startSmartImport} disabled={isProcessing} className="bg-purple-600 text-white px-4 py-2 rounded">{isProcessing ? 'Processing...' : 'Start'}</button>
              <div className="mt-4 space-y-2">
                 {importQueue.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-gray-50 p-2 rounded"><span>{item.file.name}</span><span>{item.status}</span></div>
                 ))}
              </div>
            </div>
         )}
         {activeTab === 'ORDERS' && (
           <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded shadow border">
                   <div className="flex justify-between mb-2"><h3 className="font-bold">{order.id} - {order.customerName}</h3><span className="font-bold">{order.total} EGP</span></div>
                   <div className="flex gap-2">
                      {order.status === OrderStatus.PENDING && <button onClick={() => updateStatus(order.id, OrderStatus.CONFIRMED)} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Confirm</button>}
                      {order.status === OrderStatus.CONFIRMED && <button onClick={() => updateStatus(order.id, OrderStatus.SHIPPED)} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Ship</button>}
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{order.status}</span>
                   </div>
                </div>
              ))}
           </div>
         )}
         {isModalOpen && (
           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
                 <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4"><X/></button>
                 <h2 className="font-bold mb-4">Edit Product</h2>
                 <form onSubmit={handleSaveProduct} className="space-y-4">
                    <input placeholder="Title" className="w-full border p-2" value={editingProduct.title || ''} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} required />
                    <textarea placeholder="Description" className="w-full border p-2" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} required />
                    <input type="number" placeholder="Price" className="w-full border p-2" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} required />
                    <input type="number" placeholder="Stock" className="w-full border p-2" value={editingProduct.stock || 0} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} required />
                    <button type="submit" className="w-full bg-charcoal-900 text-white py-2 font-bold">Save</button>
                 </form>
              </div>
           </div>
         )}
      </main>
    </div>
  );
}