import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';
import { Product } from '../types';
import { ArrowRight, Star, Truck, ShieldCheck, Gem } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

const Home: React.FC = () => {
  const { t, isRTL } = useAppContext();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    const products = DataService.getProducts();
    setFeatured(products.filter(p => p.isFeatured || p.price > 1000).slice(0, 4));
  }, []);

  return (
    <div className="bg-cream">
      
      {/* 1. HERO SECTION: Arched Image & Soft Gradient */}
      <section className="relative min-h-[90vh] w-full flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-sand-50 to-champagne-100 opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center md:text-start rtl:md:text-right order-2 md:order-1 fade-in-up">
            <span className="inline-block mb-4 text-xs font-bold tracking-[0.3em] text-champagne-500 uppercase">
              New Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-serif-title font-medium text-charcoal-900 mb-6 leading-[1.1]">
              {t.heroTitle}
            </h1>
            <p className="text-charcoal-600 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0 mb-10">
              {t.heroSubtitle} An ode to femininity and timeless grace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/shop" 
                className="px-10 py-4 bg-charcoal-900 text-cream hover:bg-champagne-500 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] rounded-sm shadow-lg hover:shadow-xl"
              >
                {t.shop}
              </Link>
              <Link 
                to="/shop?cat=perfume" 
                className="px-10 py-4 bg-transparent border border-charcoal-900 text-charcoal-900 hover:border-champagne-500 hover:text-champagne-500 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] rounded-sm"
              >
                {t.perfumes}
              </Link>
            </div>
          </div>

          {/* Arched Image */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
             <div className="relative w-full max-w-md aspect-[3/4]">
                {/* Decorative circle behind */}
                <div className="absolute top-10 -right-10 w-64 h-64 bg-champagne-200 rounded-full blur-3xl opacity-50"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2787&auto=format&fit=crop" 
                  className="w-full h-full object-cover shadow-2xl arch-full z-10 relative" 
                  alt="Twinkle Hero" 
                />
                
                {/* Floating caption */}
                <div className="absolute bottom-10 -left-6 z-20 bg-white/80 backdrop-blur-sm p-4 shadow-sm max-w-[12rem] border border-white">
                  <p className="font-serif-title italic text-xl text-charcoal-900">"Soft Luxury"</p>
                  <p className="text-[10px] text-charcoal-500 uppercase tracking-widest mt-1">Edition 2024</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES: Circular / Soft Shapes */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-serif-title text-charcoal-900 mb-3 italic">Our Collections</h2>
             <div className="w-16 h-0.5 bg-champagne-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            
            {/* Perfume Card */}
            <Link to="/shop?cat=PERFUME" className="group block relative cursor-pointer">
              <div className="relative h-[500px] w-full overflow-hidden rounded-t-[150px] shadow-sm transition-all duration-700 group-hover:shadow-xl">
                 <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-charcoal-900/0 transition-colors z-10"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2804&auto=format&fit=crop" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                   alt="Perfumes" 
                 />
                 <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-20 bg-gradient-to-t from-white via-white/80 to-transparent pt-20">
                    <h3 className="text-3xl font-serif-title text-charcoal-900 group-hover:text-champagne-500 transition-colors">Twinkle Perfumes</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal-500 mt-2">Discover Scents</p>
                 </div>
              </div>
            </Link>

            {/* Accessory Card */}
            <Link to="/shop?cat=ACCESSORY" className="group block relative cursor-pointer mt-0 md:mt-20">
              <div className="relative h-[500px] w-full overflow-hidden rounded-t-[150px] shadow-sm transition-all duration-700 group-hover:shadow-xl">
                 <div className="absolute inset-0 bg-charcoal-900/10 group-hover:bg-charcoal-900/0 transition-colors z-10"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2787&auto=format&fit=crop" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                   alt="Accessories" 
                 />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center z-20 bg-gradient-to-t from-white via-white/80 to-transparent pt-20">
                    <h3 className="text-3xl font-serif-title text-charcoal-900 group-hover:text-champagne-500 transition-colors">Statement Accessories</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-charcoal-500 mt-2">Shop Details</p>
                 </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. TRUST SIGNALS: Minimalist */}
      <section className="py-12 bg-sand-50 border-y border-sand-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-champagne-500">
                 <Gem size={24} strokeWidth={1} />
              </div>
              <h4 className="font-serif-title text-lg text-charcoal-900">Authentic Luxury</h4>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed max-w-xs">Crafted with the finest ingredients and materials for everyday elegance.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-champagne-500">
                 <Truck size={24} strokeWidth={1} />
              </div>
              <h4 className="font-serif-title text-lg text-charcoal-900">Fast Shipping</h4>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed max-w-xs">Delivery across all governorates of Egypt within 2-4 days.</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-champagne-500">
                 <ShieldCheck size={24} strokeWidth={1} />
              </div>
              <h4 className="font-serif-title text-lg text-charcoal-900">Cash on Delivery</h4>
              <p className="text-xs text-charcoal-500 mt-2 leading-relaxed max-w-xs">Shop with confidence. Pay when you receive your order.</p>
           </div>
        </div>
      </section>

      {/* 4. BEST SELLERS: Clean Grid */}
      <section className="py-24 bg-cream relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
                <span className="text-xs font-bold text-champagne-500 uppercase tracking-widest mb-2 block">Favorites</span>
                <h2 className="text-3xl md:text-4xl font-serif-title text-charcoal-900 italic">{t.bestSellers}</h2>
             </div>
             <Link to="/shop" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal-600 hover:text-champagne-500 transition">
               View All {isRTL ? <ArrowRight className="rotate-180" size={14} /> : <ArrowRight size={14} />}
             </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featured.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group block">
                <div className="aspect-[4/5] bg-white overflow-hidden relative mb-4 shadow-sm hover:shadow-lg transition-all duration-300">
                  <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
                  {product.stock <= 5 && (
                    <span className="absolute top-2 left-2 bg-cream/90 backdrop-blur text-charcoal-900 text-[10px] uppercase font-bold px-3 py-1 tracking-widest z-20">Limited</span>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20">
                     <ArrowRight size={16} className="text-charcoal-900" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-charcoal-900 truncate font-serif-title">{product.title}</h3>
                <p className="text-champagne-500 text-sm font-medium mt-1">{product.price} EGP</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <Link to="/shop" className="inline-block border-b border-charcoal-900 pb-1 text-xs font-bold uppercase tracking-widest text-charcoal-900">
               View All Products
             </Link>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL BUNDLE SPOTLIGHT */}
      <section className="py-24 bg-sand-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="bg-white rounded-[2rem] p-8 md:p-0 overflow-hidden shadow-sm flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 relative h-64 md:h-[500px]">
                 <img 
                   src="https://images.unsplash.com/photo-1616091093747-4797bea8f354?q=80&w=2803&auto=format&fit=crop" 
                   className="absolute inset-0 w-full h-full object-cover" 
                   alt="Bundle"
                 />
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-start rtl:md:text-right">
                 <span className="text-champagne-500 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Editorial Pick</span>
                 <h2 className="text-3xl md:text-5xl font-serif-title text-charcoal-900 mb-6 leading-tight">The "Date Night" Essentials</h2>
                 <p className="text-charcoal-600 mb-8 leading-relaxed font-light">
                   A curated pairing of our signature 'Midnight Rose' scent and the Golden Leaf Hair Clip. Designed to make you shine when the sun goes down.
                 </p>
                 <Link 
                   to="/shop?cat=BUNDLE" 
                   className="inline-block px-8 py-3 bg-charcoal-800 text-cream text-xs font-bold uppercase tracking-[0.2em] hover:bg-champagne-500 transition-colors"
                 >
                   Shop the Bundle
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* 6. INSTAGRAM FEED: Clean Gallery */}
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="mb-10">
           <h2 className="text-2xl font-serif-title text-charcoal-900 italic">@TwinkleEgypt</h2>
           <p className="text-xs text-charcoal-500 uppercase tracking-widest mt-2">Join our world of softness</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
           {[101, 102, 103, 104, 105, 106].map(id => (
             <div key={id} className="aspect-square bg-sand-50 overflow-hidden relative group cursor-pointer rounded-sm">
               <img src={`https://picsum.photos/id/${id}/400/400`} alt="Insta" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition duration-700" />
               <div className="absolute inset-0 bg-charcoal-900/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                 <Star size={20} fill="currentColor" stroke="none" />
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Home;