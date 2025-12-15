"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { Product, ProductCategory } from '../../lib/types';
import { ProductImage } from '../../components/ProductImage';
import { Filter, X } from 'lucide-react';

function ShopContent() {
  const { t } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat');

  // Filters state
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setProducts(DataService.getProducts());
    if (catParam) {
      if(catParam.toUpperCase().includes('PERFUME')) setSelectedCat(ProductCategory.PERFUME);
      else if(catParam.toUpperCase().includes('ACCESSORY')) setSelectedCat(ProductCategory.ACCESSORY);
    }
  }, [catParam]);

  useEffect(() => {
    let result = products;
    if (selectedCat !== 'ALL') {
      result = result.filter(p => p.category === selectedCat);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q));
    }
    setFilteredProducts(result);
  }, [selectedCat, priceRange, searchQuery, products]);

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-sand-200">
           <h1 className="text-3xl font-serif text-charcoal-900 italic mb-4 md:mb-0">Shop Collection</h1>
           <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="md:hidden flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal-600 border border-sand-300 px-4 py-2 rounded-sm"><Filter size={14} /> Filter</button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className={`fixed inset-0 z-50 bg-white p-6 transform transition-transform duration-300 md:relative md:inset-auto md:bg-transparent md:p-0 md:transform-none md:w-64 md:block ${mobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
             <div className="flex justify-between md:hidden mb-8">
                <span className="font-serif text-xl">Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}><X size={24}/></button>
             </div>
             <div className="space-y-10">
               <div>
                  <input type="text" placeholder="Search..." className="w-full bg-sand-50 border-b border-sand-300 p-2 text-sm outline-none" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
               </div>
               <div>
                 <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-charcoal-400">{t.category}</h4>
                 <div className="space-y-3 text-sm font-light text-charcoal-600">
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="cat" checked={selectedCat === 'ALL'} onChange={() => setSelectedCat('ALL')} /> All</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="cat" checked={selectedCat === ProductCategory.PERFUME} onChange={() => setSelectedCat(ProductCategory.PERFUME)} /> {t.perfumes}</label>
                    <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="cat" checked={selectedCat === ProductCategory.ACCESSORY} onChange={() => setSelectedCat(ProductCategory.ACCESSORY)} /> {t.accessories}</label>
                 </div>
               </div>
               <div>
                 <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-4 text-charcoal-400">{t.price}</h4>
                 <input type="range" min="0" max="10000" step="100" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full h-1 bg-sand-200 rounded-lg appearance-none cursor-pointer" />
                 <div className="flex justify-between text-xs text-charcoal-500 mt-2 font-medium"><span>0 EGP</span><span>{priceRange[1]} EGP</span></div>
               </div>
             </div>
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="group block">
                  <div className="aspect-[4/5] bg-white overflow-hidden relative mb-4 shadow-sm border border-sand-100">
                    <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-charcoal-400 uppercase tracking-widest mb-1">{product.brand || 'Twinkle'}</p>
                    <h3 className="font-serif text-lg text-charcoal-900 truncate">{product.title}</h3>
                    <span className="text-charcoal-600 text-sm font-medium">{product.price} EGP</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}