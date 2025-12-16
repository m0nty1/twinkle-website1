"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';
import { DataService } from '../../../services/dataService';
import { Product } from '../../../lib/types';
import { ProductImage } from '../../../components/ProductImage';
import { Check, Info } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const products = DataService.getProducts();
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  const handleAdd = () => {
    if (product) {
      addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pt-24 min-h-screen pb-24">
       <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
             
             {/* Left: Images (Sticky Grid) */}
             <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 h-fit">
                <div className="col-span-1 md:col-span-2 aspect-[4/5] bg-zinc-100 overflow-hidden">
                   <ProductImage 
                     src={product.images[selectedImg]} 
                     alt={product.title} 
                     className="w-full h-full" 
                     category={product.category}
                     priority={true} // Priority loading for main view
                   />
                </div>
                {/* Thumbnails if any */}
                {product.images.map((img, idx) => (
                   idx !== selectedImg && (
                    <div key={idx} onClick={() => setSelectedImg(idx)} className="aspect-square bg-zinc-100 cursor-pointer overflow-hidden">
                        <ProductImage src={img} alt="thumb" className="w-full h-full opacity-70 hover:opacity-100 transition" category={product.category} />
                    </div>
                   )
                ))}
             </div>

             {/* Right: Details (Sticky) */}
             <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-10">
                <div>
                   <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">{product.brand || 'Twinkle Exclusive'}</p>
                   <h1 className="text-5xl font-serif text-primary mb-6 leading-tight">{product.title}</h1>
                   <p className="text-3xl font-light text-zinc-800">{product.price} EGP</p>
                </div>

                <div className="prose prose-sm text-zinc-600 leading-relaxed">
                   {product.description}
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-6 border-y border-zinc-200 py-6">
                   {product.attributes?.size && (
                      <div><span className="block text-xs uppercase text-zinc-400 mb-1">Size</span><span className="font-bold">{product.attributes.size}</span></div>
                   )}
                   {product.attributes?.concentration && (
                      <div><span className="block text-xs uppercase text-zinc-400 mb-1">Type</span><span className="font-bold">{product.attributes.concentration}</span></div>
                   )}
                   {product.attributes?.notes && (
                      <div className="col-span-2"><span className="block text-xs uppercase text-zinc-400 mb-1">Notes</span><span className="font-serif italic text-lg">{product.attributes.notes}</span></div>
                   )}
                </div>

                <button 
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`w-full py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                     product.stock === 0 ? 'bg-zinc-200 text-zinc-400' : 'bg-primary text-white hover:bg-accent'
                  }`}
                >
                  {product.stock === 0 ? 'Out of Stock' : (added ? 'Added to Bag' : 'Add to Bag')}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}