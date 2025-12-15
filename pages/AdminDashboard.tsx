import React, { useEffect, useState } from 'react';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';
import { AIService } from '../services/aiService';
import { Product, Order, OrderStatus, ProductCategory, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit, Trash, CheckCircle, Package, Truck, XCircle, Upload, X, Wand2, Loader2, Save } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

const AdminDashboard: React.FC = () => {
  const { user } = useAppContext();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'ORDERS' | 'MEDIA' | 'SMART_IMPORT'>('OVERVIEW');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [mediaLibrary, setMediaLibrary] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Product Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({});
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Smart Import State
  const [importQueue, setImportQueue] = useState<{ file: File, status: 'pending' | 'processing' | 'matched' | 'error', match?: string, productId?: string }[]>([]);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    const p = DataService.getProducts();
    const o = DataService.getOrders();
    const m = DataService.getMediaLibrary();
    setProducts(p);
    setOrders(o);
    setMediaLibrary(m);
    setLoading(false);
  };

  // --- CRUD Operations (Existing) ---
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

  const removeImageFromProduct = (index: number) => {
    const currentImages = editingProduct.images || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    setEditingProduct({ ...editingProduct, images: newImages });
  };

  const addImageToProduct = (img: string) => {
    const currentImages = editingProduct.images || [];
    if (!currentImages.includes(img)) {
      setEditingProduct({ ...editingProduct, images: [...currentImages, img] });
    }
    setShowMediaPicker(false);
  };

  // --- SMART IMPORT LOGIC ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImportQueue(files.map(f => ({ file: f, status: 'pending' })));
    }
  };

  const startSmartImport = async () => {
    if (!user) return;
    setIsProcessingQueue(true);

    const queue = [...importQueue];
    // Process sequentially to avoid rate limits, but could be parallel in prod
    for (let i = 0; i < queue.length; i++) {
      const item = queue[i];
      if (item.status === 'matched') continue;

      // Update UI to processing
      queue[i].status = 'processing';
      setImportQueue([...queue]);

      try {
        // 1. Convert to Base64
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
             const result = reader.result as string;
             // Remove data URL prefix for API
             const base64Data = result.split(',')[1];
             resolve(base64Data);
          };
          reader.readAsDataURL(item.file);
        });

        // 2. Ask Gemini to match
        const result = await AIService.matchImageToProduct(base64, products);
        
        if (result.productId) {
          queue[i].status = 'matched';
          queue[i].match = result.reasoning;
          queue[i].productId = result.productId;
          
          // 3. Auto-Apply Match to Database
          // We assume the user put the file in /products/ folder, so we map the filename
          // Note: Browser paths are virtual. We trust the user put the file in public/products/
          const cleanPath = `/products/${item.file.name}`; // Flat structure inside products/ for simplicity if user drags there
          
          const product = products.find(p => p.id === result.productId);
          if (product) {
            // Replace images with this new high-res one
            const updatedProduct = { ...product, images: [cleanPath] };
            await DataService.saveProduct(updatedProduct, user);
            
            // Also add to media library
            await DataService.addToMediaLibrary(cleanPath, user);
          }
        } else {
          queue[i].status = 'error';
        }
      } catch (e) {
        console.error(e);
        queue[i].status = 'error';
      }
      setImportQueue([...queue]);
    }

    setIsProcessingQueue(false);
    loadData(); // Refresh main data
  };

  // --- Analytics Data Prep ---
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const ordersByStatus = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const chartData = Object.keys(ordersByStatus).map(key => ({ name: key, count: ordersByStatus[key] }));

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-dark-900">Admin Panel</h2>
          <p className="text-xs text-gray-500 mt-1">Logged in as {user.name} ({user.role})</p>
        </div>
        <nav className="mt-4">
           <button onClick={() => setActiveTab('OVERVIEW')} className={`w-full text-left px-6 py-3 hover:bg-gold-50 ${activeTab === 'OVERVIEW' ? 'border-r-4 border-gold-500 bg-gold-50 font-bold' : ''}`}>Overview</button>
           {user.role !== UserRole.VIEWER && (
             <>
               <button onClick={() => setActiveTab('PRODUCTS')} className={`w-full text-left px-6 py-3 hover:bg-gold-50 ${activeTab === 'PRODUCTS' ? 'border-r-4 border-gold-500 bg-gold-50 font-bold' : ''}`}>Products</button>
               <button onClick={() => setActiveTab('SMART_IMPORT')} className={`w-full text-left px-6 py-3 hover:bg-gold-50 ${activeTab === 'SMART_IMPORT' ? 'border-r-4 border-gold-500 bg-gold-50 font-bold text-purple-600' : 'text-purple-600'}`}>✨ Smart Import</button>
             </>
           )}
           <button onClick={() => setActiveTab('ORDERS')} className={`w-full text-left px-6 py-3 hover:bg-gold-50 ${activeTab === 'ORDERS' ? 'border-r-4 border-gold-500 bg-gold-50 font-bold' : ''}`}>Orders</button>
           <button onClick={() => setActiveTab('MEDIA')} className={`w-full text-left px-6 py-3 hover:bg-gold-50 ${activeTab === 'MEDIA' ? 'border-r-4 border-gold-500 bg-gold-50 font-bold' : ''}`}>Media Library</button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {loading ? <div className="text-center">Loading Data...</div> : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'OVERVIEW' && (
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white p-6 rounded shadow-sm">
                     <h3 className="text-gray-500 text-sm font-bold uppercase">Total Revenue</h3>
                     <p className="text-3xl font-bold text-dark-900 mt-2">{totalRevenue.toLocaleString()} EGP</p>
                   </div>
                   <div className="bg-white p-6 rounded shadow-sm">
                     <h3 className="text-gray-500 text-sm font-bold uppercase">Total Orders</h3>
                     <p className="text-3xl font-bold text-dark-900 mt-2">{orders.length}</p>
                   </div>
                   <div className="bg-white p-6 rounded shadow-sm">
                     <h3 className="text-gray-500 text-sm font-bold uppercase">Low Stock Alerts</h3>
                     <p className="text-3xl font-bold text-red-500 mt-2">{products.filter(p => p.stock < 5).length}</p>
                   </div>
                 </div>
                 <div className="bg-white p-6 rounded shadow-sm h-80">
                   <h3 className="font-bold mb-4">Orders by Status</h3>
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={chartData}>
                       <XAxis dataKey="name" fontSize={12} />
                       <YAxis />
                       <Tooltip />
                       <Bar dataKey="count" fill="#D4AF37" />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
              </div>
            )}

            {/* SMART IMPORT TAB */}
            {activeTab === 'SMART_IMPORT' && (
              <div className="max-w-4xl">
                <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
                   <h2 className="text-2xl font-bold text-purple-900 mb-2 flex items-center gap-2"><Wand2/> AI Auto-Mapper</h2>
                   <p className="text-purple-700 text-sm mb-4">
                     Stop renaming files manually! Drop your raw images (DSC_001.jpg, etc.) into your project's <strong>/public/products/</strong> folder first. 
                     Then select them below. The AI will analyze the image, find the matching product, and link them automatically.
                   </p>
                   <div className="flex gap-4 items-center">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileSelect}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                      />
                      {importQueue.length > 0 && !isProcessingQueue && (
                        <button onClick={startSmartImport} className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-700 flex items-center gap-2">
                          <Wand2 size={16}/> Start Matching
                        </button>
                      )}
                      {isProcessingQueue && (
                        <button disabled className="bg-purple-400 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 cursor-wait">
                          <Loader2 size={16} className="animate-spin"/> AI Processing...
                        </button>
                      )}
                   </div>
                </div>

                {/* Queue Display */}
                <div className="space-y-2">
                   {importQueue.map((item, idx) => {
                     const matchedProduct = products.find(p => p.id === item.productId);
                     return (
                       <div key={idx} className="bg-white p-3 rounded shadow-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{item.file.name}</span>
                             <span className="text-gray-400 text-xs">→</span>
                             {item.status === 'processing' && <span className="text-purple-500 text-xs font-bold animate-pulse">Thinking...</span>}
                             {item.status === 'matched' && matchedProduct && (
                               <div className="flex items-center gap-2 text-green-700">
                                  <CheckCircle size={14} />
                                  <span className="font-bold text-sm">{matchedProduct.title}</span>
                                  <span className="text-xs text-gray-400">({item.match})</span>
                               </div>
                             )}
                             {item.status === 'error' && <span className="text-red-500 text-xs">No match found</span>}
                             {item.status === 'pending' && <span className="text-gray-400 text-xs">Waiting...</span>}
                          </div>
                          {item.status === 'matched' && <span className="text-[10px] uppercase tracking-widest text-green-600 border border-green-200 px-2 py-0.5 rounded">Saved</span>}
                       </div>
                     );
                   })}
                </div>
              </div>
            )}

            {/* MEDIA TAB */}
            {activeTab === 'MEDIA' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Media Library</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {mediaLibrary.map((src, idx) => (
                    <div key={idx} className="group relative bg-white p-2 rounded border hover:border-gold-500 transition">
                       <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-2">
                          <ProductImage src={src} alt="media" className="w-full h-full object-cover" />
                       </div>
                       <p className="text-[10px] text-gray-500 break-all">{src.split('/').pop()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'PRODUCTS' && (
              <div>
                <div className="flex justify-between mb-6">
                  <h2 className="text-2xl font-bold">Product Management</h2>
                  <button onClick={() => { setEditingProduct({ category: ProductCategory.PERFUME, images: [] }); setIsModalOpen(true); }} className="bg-dark-900 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gold-600 transition">
                    <Plus size={18} /> Add Product
                  </button>
                </div>
                <div className="bg-white rounded shadow overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-4">Image</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                             <div className="w-10 h-10 rounded overflow-hidden">
                               <ProductImage src={p.images[0]} alt={p.title} category={p.category} />
                             </div>
                          </td>
                          <td className="p-4 font-medium">{p.title}</td>
                          <td className={`p-4 font-bold ${p.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>{p.stock}</td>
                          <td className="p-4">{p.price} EGP</td>
                          <td className="p-4 flex gap-2">
                             <button onClick={() => { setEditingProduct(p); setIsModalOpen(true); }} className="text-blue-500"><Edit size={16}/></button>
                             <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500"><Trash size={16}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'ORDERS' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Order Management</h2>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 rounded shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{order.id} <span className="text-gray-400 text-sm font-normal">by {order.customerName}</span></h3>
                          <p className="text-xs text-gray-500">{new Date(order.date).toLocaleString()}</p>
                          <p className="text-sm mt-1">{order.governorate} - {order.customerPhone}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === OrderStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                          <p className="font-bold text-gold-600 mt-2">{order.total} EGP</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        {order.status === OrderStatus.PENDING && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.CONFIRMED)} className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"><CheckCircle size={14}/> Confirm</button>
                        )}
                        {order.status === OrderStatus.CONFIRMED && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.SHIPPED)} className="flex items-center gap-1 text-xs bg-purple-50 text-purple-600 px-3 py-1 rounded hover:bg-purple-100"><Package size={14}/> Ship</button>
                        )}
                        {order.status === OrderStatus.SHIPPED && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.DELIVERED)} className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-3 py-1 rounded hover:bg-green-100"><Truck size={14}/> Deliver</button>
                        )}
                        {order.status !== OrderStatus.CANCELLED && order.status !== OrderStatus.DELIVERED && (
                          <button onClick={() => updateStatus(order.id, OrderStatus.CANCELLED)} className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100"><XCircle size={14}/> Cancel</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCT MODAL */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-10">
                <div className="bg-white p-8 rounded-lg w-full max-w-4xl m-4 relative max-h-[90vh] overflow-y-auto">
                   <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4"><XCircle/></button>
                   <h2 className="text-xl font-bold mb-6">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column: Details */}
                      <form id="productForm" onSubmit={handleSaveProduct} className="space-y-4">
                          <div><label className="block text-xs font-bold mb-1">Title</label><input className="w-full border p-2 rounded" value={editingProduct.title || ''} onChange={e => setEditingProduct({...editingProduct, title: e.target.value})} required /></div>
                          <div><label className="block text-xs font-bold mb-1">Description</label><textarea className="w-full border p-2 rounded" rows={3} value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} required /></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-xs font-bold mb-1">Price</label><input type="number" className="w-full border p-2 rounded" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} required /></div>
                            <div><label className="block text-xs font-bold mb-1">Stock</label><input type="number" className="w-full border p-2 rounded" value={editingProduct.stock || 0} onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})} required /></div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold mb-1">Category</label>
                            <select className="w-full border p-2 rounded" value={editingProduct.category || ProductCategory.PERFUME} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as ProductCategory})}>
                              <option value={ProductCategory.PERFUME}>Perfume</option>
                              <option value={ProductCategory.ACCESSORY}>Accessory</option>
                              <option value={ProductCategory.BUNDLE}>Bundle</option>
                            </select>
                          </div>
                      </form>
                      {/* Right Column: Images */}
                      <div className="bg-gray-50 p-6 rounded border border-gray-200">
                          <h3 className="font-bold text-sm mb-4">Product Images</h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                             {editingProduct.images?.map((img, idx) => (
                               <div key={idx} className="relative w-20 h-20 bg-white border rounded group">
                                  <ProductImage src={img} alt="prod" className="w-full h-full object-cover rounded" />
                                  <button onClick={() => removeImageFromProduct(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"><X size={12} /></button>
                               </div>
                             ))}
                             <button onClick={() => setShowMediaPicker(true)} className="w-20 h-20 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-gold-500 hover:text-gold-500 rounded"><Plus size={24}/></button>
                          </div>
                          {showMediaPicker && (
                            <div className="bg-white border border-gray-200 rounded p-4 shadow-sm animate-fade-in-up">
                               <div className="flex justify-between items-center mb-2"><h4 className="text-xs font-bold uppercase tracking-wider">Select from Library</h4><button onClick={() => setShowMediaPicker(false)}><X size={16}/></button></div>
                               <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                                  {mediaLibrary.map((src, idx) => (
                                    <div key={idx} onClick={() => addImageToProduct(src)} className="aspect-square bg-gray-100 cursor-pointer border hover:border-gold-500 rounded overflow-hidden">
                                       <ProductImage src={src} alt="option" className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                               </div>
                            </div>
                          )}
                      </div>
                   </div>
                   <div className="mt-8 pt-4 border-t">
                      <button form="productForm" type="submit" className="w-full bg-gold-500 text-white py-3 rounded font-bold hover:bg-gold-600 uppercase tracking-widest">Save Product</button>
                   </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;