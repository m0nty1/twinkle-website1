"use client";
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { AIService } from '../../services/aiService';
import { Product, Order, ProductCategory } from '../../lib/types';
import { Wand2, Loader2, CheckCircle } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export default function AdminDashboard() {
  const { user } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [importQueue, setImportQueue] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => { setProducts(DataService.getProducts()); }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImportQueue(Array.from(e.target.files).map(f => ({ file: f, status: 'pending' })));
  };

  const startSmartImport = async () => {
    setIsProcessing(true);
    const queue = [...importQueue];
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status === 'matched') continue;
      queue[i].status = 'processing';
      setImportQueue([...queue]);
      try {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(item.file);
        });
        const result = await AIService.matchImageToProduct(base64, products);
        if (result.productId) {
          queue[i].status = 'matched';
          queue[i].match = result.reasoning;
          const cleanPath = `/products/${item.file.name}`;
          if (user) await DataService.addToMediaLibrary(cleanPath, user);
        } else {
          queue[i].status = 'error';
        }
      } catch (e) { queue[i].status = 'error'; }
      setImportQueue([...queue]);
    }
    setIsProcessing(false);
  };

  if (!user) return <div>Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="font-bold flex gap-2 items-center mb-4"><Wand2/> Smart Import</h2>
        <input type="file" multiple accept="image/*" onChange={handleFileSelect} className="mb-4"/>
        <button onClick={startSmartImport} disabled={isProcessing} className="bg-purple-600 text-white px-4 py-2 rounded">
          {isProcessing ? 'Processing...' : 'Start Matching'}
        </button>
        <div className="mt-4 space-y-2">
          {importQueue.map((item, idx) => (
             <div key={idx} className="flex justify-between bg-gray-50 p-2 rounded">
               <span>{item.file.name}</span>
               <span className={item.status === 'matched' ? 'text-green-600' : 'text-gray-500'}>{item.status}</span>
             </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">
         <h2 className="font-bold mb-4">Products</h2>
         <div className="grid grid-cols-4 gap-4">
           {products.map(p => (
             <div key={p.id} className="border p-2">
               <div className="aspect-square"><ProductImage src={p.images[0]} alt={p.title} category={p.category}/></div>
               <p className="text-xs mt-1 font-bold">{p.title}</p>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}