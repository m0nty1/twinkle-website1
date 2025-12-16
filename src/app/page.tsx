"use client";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { Product } from '../../lib/types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductImage } from '../../components/ProductImage';

export default function Home() {
  const { t } = useAppContext();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [heroProduct, setHeroProduct] = useState<Product | null>(null);

  useEffect(() => {
    const products = DataService.getProducts();
    // Use the 5th product (Royal Blue Oud) as hero if available, else first
    setHeroProduct(products[4] || products[0]); 
    setFeatured(products.slice(0, 4));
  }, []);

  return (
    <div>
      {/* 1. HERO SECTION - Split Screen Editorial */}
      <section className="h-screen w-full flex flex-col md:flex-row pt-20">
        {/* Left: Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 bg-light z-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6 animate-fade-in">
            New Collection 2024
          </span>
          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] text-primary mb-8 animate-slide-up">
            ELEVATE <br/> <span className="italic text-zinc-500">YOUR</span> <br/> SENSES
          </h1>
          <p className="text-sm md:text-base text-zinc-600 max-w-sm leading-relaxed mb-10 animate-fade-in delay-100">
            Discover a curated world of olfactory masterpieces and artisanal accessories. Designed for the modern muse.
          </p>
          <div className="flex gap-6 animate-fade-in delay-200">
            <Link to="/shop" className="bg-primary text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-colors">
              Shop Now
            </Link>
            <Link to="/ai-chat" className="border border-primary text-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-accent hover:text-accent transition-colors">
              Consult AI
            </Link>
          </div>
        </div>
        
        {/* Right: Image (Strictly using local product image) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden bg-zinc-200">
          {heroProduct && (
             <div className="absolute inset-0 w-full h-full">
                <ProductImage 
                   src={heroProduct.images[0]} 
                   alt="Hero" 
                   className="w-full h-full"
                   category={heroProduct.category}
                   priority={true} // LCP Optimization
                />
             </div>
          )}
          {/* Overlay Text */}
          <div className="absolute bottom-10 right-10 text-right text-white mix-blend-difference">
             <p className="text-xs font-bold uppercase tracking-widest">{heroProduct?.title}</p>
             <p className="font-serif italic text-2xl">Signature Edition</p>
          </div>
        </div>
      </section>

      {/* 2. TICKER */}
      <div className="bg-primary text-white py-4 overflow-hidden whitespace-nowrap border-y border-zinc-800">
        <div className="inline-block animate-marquee text-xs font-bold uppercase tracking-[0.3em]">
          <span className="mx-8">Free Shipping on Orders over 1500 EGP</span> • 
          <span className="mx-8">Cash on Delivery Available</span> • 
          <span className="mx-8">Authentic Luxury</span> •
          <span className="mx-8">Free Shipping on Orders over 1500 EGP</span> • 
          <span className="mx-8">Cash on Delivery Available</span>
        </div>
      </div>

      {/* 3. CATEGORY SPLIT */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[80vh]">
         {/* Perfume Category */}
         <Link to="/shop?cat=PERFUME" className="relative group overflow-hidden border-r border-b border-zinc-200 bg-white">
            <div className="absolute inset-0 p-12 flex flex-col justify-between z-20 pointer-events-none">
               <h2 className="text-4xl font-serif text-primary group-hover:text-white transition-colors duration-500">Perfumes</h2>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                  Explore <ArrowRight size={14}/>
               </div>
            </div>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 opacity-90"></div>
            {/* Using a specific perfume image from constants (p002) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity duration-500">
               {/* We create a visual placeholder using the product image component logic internally if strictly needed, but here we just use a div with background color or text since we can't easily grab specific image without importing constants again. 
                   Actually, we can fetch all products and grab the images. */}
               <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                  <ProductImage src={DataService.getProducts()[1]?.images[0] || ''} alt="Perfume" className="w-full h-full"/>
               </div>
            </div>
         </Link>

         {/* Accessories Category */}
         <Link to="/accessories" className="relative group overflow-hidden border-b border-zinc-200 bg-zinc-50">
            <div className="absolute inset-0 p-12 flex flex-col justify-between z-20 pointer-events-none">
               <h2 className="text-4xl font-serif text-primary group-hover:text-white transition-colors duration-500">Accessories</h2>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">
                  Explore <ArrowRight size={14}/>
               </div>
            </div>
             <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10 opacity-90"></div>
            {/* Using a specific accessory image from constants (a001) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity duration-500">
                <div className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
                  {/* Accessories start after perfumes (20 perfumes) so index 20 */}
                  <ProductImage src={DataService.getProducts()[20]?.images[0] || ''} alt="Accessory" className="w-full h-full"/>
               </div>
            </div>
         </Link>
      </section>

      {/* 4. FEATURED PRODUCTS (Minimal Grid) */}
      <section className="py-24 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-serif italic">Curated For You</h2>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 mb-4 relative">
                 <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                 {/* Quick Add Overlay */}
                 <div className="absolute bottom-0 left-0 w-full bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-zinc-100 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">View Details</span>
                    <ArrowRight size={14} />
                 </div>
              </div>
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-sm font-bold uppercase tracking-wide mb-1">{product.title}</h3>
                    <p className="text-xs text-zinc-500">{product.category}</p>
                 </div>
                 <span className="text-sm font-serif">{product.price} EGP</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL TEXT SECTION */}
      <section className="py-32 px-6 bg-primary text-white text-center">
         <div className="max-w-3xl mx-auto">
           <Sparkles className="mx-auto mb-6 text-accent" size={32} />
           <p className="text-2xl md:text-4xl font-serif leading-tight mb-8">
             "Beauty is not just about what you see, but how you feel. Our collections are designed to evoke emotion, memory, and confidence."
           </p>
           <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">The Twinkle Philosophy</p>
         </div>
      </section>
    </div>
  );
}