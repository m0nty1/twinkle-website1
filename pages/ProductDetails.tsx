import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';
import { Product } from '../types';
import { Check } from 'lucide-react';
import { ProductImage } from '../components/ProductImage';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, addToCart } = useAppContext();
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

  if (!product) return <div className="text-center py-20 bg-cream min-h-screen">Loading...</div>;

  return (
    <div className="bg-cream min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Images - Gallery style */}
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-sand-50 overflow-hidden rounded-t-[100px] shadow-sm relative">
              <ProductImage 
                src={product.images[selectedImg]} 
                alt={product.title} 
                className="w-full h-full"
                category={product.category}
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 justify-center">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setSelectedImg(idx)}
                  className={`w-20 h-20 flex-shrink-0 border transition-all duration-300 rounded-sm overflow-hidden ${selectedImg === idx ? 'border-champagne-500 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
          </div>

          {/* Info - Editorial text */}
          <div className="flex flex-col justify-center pt-8 md:pt-0">
            <div className="mb-6">
               <p className="text-xs text-champagne-500 font-bold uppercase tracking-[0.2em] mb-3">{product.brand || 'Twinkle Collection'}</p>
               <h1 className="text-4xl md:text-5xl font-serif-title text-charcoal-900 mb-6 font-medium leading-tight">{product.title}</h1>
               <p className="text-2xl font-light text-charcoal-600">{product.price} EGP</p>
            </div>
            
            <div className="w-12 h-px bg-sand-300 mb-8"></div>

            <div className="prose text-charcoal-600 mb-10 leading-relaxed font-light text-sm max-w-md">
              {product.description}
            </div>

            {/* Attributes Grid */}
            <div className="bg-sand-50 p-6 rounded-sm mb-10 border border-sand-100">
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                {product.attributes?.notes && (
                   <div>
                     <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-1">Notes</span>
                     <span className="text-charcoal-800 font-medium font-serif-title italic">{product.attributes.notes}</span>
                   </div>
                )}
                {product.attributes?.concentration && (
                   <div>
                     <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-1">Concentration</span>
                     <span className="text-charcoal-800 font-medium">{product.attributes.concentration}</span>
                   </div>
                )}
                {product.attributes?.size && (
                   <div>
                     <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-1">Size</span>
                     <span className="text-charcoal-800 font-medium">{product.attributes.size}</span>
                   </div>
                )}
                 {product.attributes?.material && (
                   <div>
                     <span className="text-xs uppercase tracking-widest text-charcoal-400 block mb-1">Material</span>
                     <span className="text-charcoal-800 font-medium">{product.attributes.material}</span>
                   </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-sm">
               <button 
                  disabled={product.stock === 0}
                  onClick={handleAdd}
                  className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow-md hover:shadow-lg
                    ${product.stock > 0 
                      ? 'bg-charcoal-900 text-cream hover:bg-champagne-500' 
                      : 'bg-sand-200 text-charcoal-400 cursor-not-allowed'}
                  `}
               >
                  {product.stock === 0 ? t.outOfStock : (added ? <span className="flex items-center gap-2"><Check size={16}/> Added to Bag</span> : t.addToCart)}
               </button>
               {product.stock > 0 && product.stock < 10 && (
                 <p className="text-center text-[10px] text-red-400 font-medium uppercase tracking-wider">
                    Only {product.stock} items left
                 </p>
               )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;