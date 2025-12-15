import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';
import { Product, ProductCategory } from '../types';
import { Filter, X } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

const Shop: React.FC = () => {
  const { t } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Load products
    const all = DataService.getProducts();
    setProducts(all);
    
    // Check URL params for initial category
    const catParam = searchParams.get('cat');
    if (catParam) {
      if(catParam.toUpperCase().includes('PERFUME')) setSelectedCat(ProductCategory.PERFUME);
      else if(catParam.toUpperCase().includes('ACCESSORY')) setSelectedCat(ProductCategory.ACCESSORY);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = products;

    // Filter by Category
    if (selectedCat !== 'ALL') {
      result = result.filter(p => p.category === selectedCat);
    }

    // Filter by Price
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }

    setFilteredProducts(result);
  }, [selectedCat, priceRange, searchQuery, products]);

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-sand-200">
           <h1 className="text-3xl font-serif-title text-charcoal-900 italic mb-4 md:mb-0">Shop Collection</h1>
           <button 
             onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
             className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal-600 border border-sand-300 px-4 py-2 rounded-sm"
           >
             <Filter size={14} /> Filter
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <div className={`
             fixed inset-0 z-50 bg-white p-6 transform transition-transform duration-300 md:relative md:inset-auto md:bg-transparent md:p-0 md:transform-none md:w-64 md:block
             ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
             <div className="flex justify-between md:hidden mb-8">
                <span className="font-serif-title text-xl">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}><X size={24}/></button>
             </div>

            <div className="space-y-10">
              {/* Search */}
              <div>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-sand-50 border-b border-sand-300 p-2 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-champagne-500 outline-none transition-colors"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-charcoal-400">{t.category}</h4>
                <div className="space-y-3 text-sm font-light text-charcoal-600">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-3 h-3 rounded-full border border-charcoal-300 flex items-center justify-center ${selectedCat === 'ALL' ? 'border-champagne-500' : ''}`}>
                       {selectedCat === 'ALL' && <div className="w-1.5 h-1.5 rounded-full bg-champagne-500"></div>}
                    </div>
                    <input type="radio" name="cat" className="hidden" checked={selectedCat === 'ALL'} onChange={() => setSelectedCat('ALL')} />
                    <span className="group-hover:text-champagne-500 transition">All Products</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-3 h-3 rounded-full border border-charcoal-300 flex items-center justify-center ${selectedCat === ProductCategory.PERFUME ? 'border-champagne-500' : ''}`}>
                       {selectedCat === ProductCategory.PERFUME && <div className="w-1.5 h-1.5 rounded-full bg-champagne-500"></div>}
                    </div>
                    <input type="radio" name="cat" className="hidden" checked={selectedCat === ProductCategory.PERFUME} onChange={() => setSelectedCat(ProductCategory.PERFUME)} />
                    <span className="group-hover:text-champagne-500 transition">{t.perfumes}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-3 h-3 rounded-full border border-charcoal-300 flex items-center justify-center ${selectedCat === ProductCategory.ACCESSORY ? 'border-champagne-500' : ''}`}>
                       {selectedCat === ProductCategory.ACCESSORY && <div className="w-1.5 h-1.5 rounded-full bg-champagne-500"></div>}
                    </div>
                    <input type="radio" name="cat" className="hidden" checked={selectedCat === ProductCategory.ACCESSORY} onChange={() => setSelectedCat(ProductCategory.ACCESSORY)} />
                    <span className="group-hover:text-champagne-500 transition">{t.accessories}</span>
                  </label>
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-charcoal-400">{t.price}</h4>
                <input 
                  type="range" 
                  min="0" max="10000" step="100" 
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-champagne-500 h-1 bg-sand-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-charcoal-500 mt-2 font-medium">
                  <span>0 EGP</span>
                  <span>{priceRange[1]} EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="aspect-[4/5] bg-white overflow-hidden relative mb-4 shadow-sm border border-sand-100 group-hover:border-champagne-200 transition-colors">
                    <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                        <span className="text-charcoal-900 border border-charcoal-900 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">{t.outOfStock}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-charcoal-400 uppercase tracking-widest mb-1">{product.brand || 'Twinkle'}</p>
                    <h3 className="font-serif-title text-lg text-charcoal-900 truncate group-hover:text-champagne-500 transition-colors">{product.title}</h3>
                    <div className="flex justify-center items-center mt-2 gap-2">
                      <span className="text-charcoal-600 text-sm font-medium">{product.price} EGP</span>
                    </div>
                  </div>
                </Link>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-3 text-center py-20">
                  <p className="font-serif-title text-xl text-charcoal-400 italic">No treasures found.</p>
                  <button onClick={() => {setSelectedCat('ALL'); setPriceRange([0, 10000]); setSearchQuery('');}} className="mt-4 text-xs font-bold uppercase tracking-widest text-champagne-500 border-b border-champagne-500">Clear Filters</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;