"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { Product, ProductCategory } from '../../lib/types';
import { ProductImage } from '../../components/ProductImage';
import { Filter, X, ChevronDown } from 'lucide-react';

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('cat');

  // Filters
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const all = DataService.getProducts();
    setProducts(all);
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
    setFilteredProducts(result);
  }, [selectedCat, products]);

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b border-zinc-200">
           <div>
             <h1 className="text-5xl md:text-7xl font-serif mb-4 text-primary">The Collection</h1>
             <p className="text-sm text-zinc-500 max-w-md">Browse our complete inventory of fine fragrances and accessories.</p>
           </div>
           <div className="flex gap-4 mt-6 md:mt-0">
              <button onClick={() => setSelectedCat('ALL')} className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border ${selectedCat === 'ALL' ? 'bg-primary text-white border-primary' : 'bg-transparent border-zinc-200 text-zinc-500'}`}>All</button>
              <button onClick={() => setSelectedCat(ProductCategory.PERFUME)} className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border ${selectedCat === ProductCategory.PERFUME ? 'bg-primary text-white border-primary' : 'bg-transparent border-zinc-200 text-zinc-500'}`}>Perfumes</button>
              <button onClick={() => setSelectedCat(ProductCategory.ACCESSORY)} className={`text-xs font-bold uppercase tracking-widest px-4 py-2 border ${selectedCat === ProductCategory.ACCESSORY ? 'bg-primary text-white border-primary' : 'bg-transparent border-zinc-200 text-zinc-500'}`}>Accessories</button>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16 mb-24">
           {filteredProducts.map(product => (
             <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="aspect-[3/4] bg-zinc-100 overflow-hidden relative mb-6">
                   <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex justify-between items-baseline">
                   <h3 className="text-sm font-bold uppercase tracking-wide text-primary group-hover:text-accent transition-colors truncate pr-4">{product.title}</h3>
                   <span className="text-sm font-serif text-zinc-600 whitespace-nowrap">{product.price} EGP</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{product.category}</p>
             </Link>
           ))}
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
