"use client";

import React, { useState, useEffect } from 'react';
import { IS_PREVIEW_MODE } from '../lib/constants';
import { Sparkles } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
}

const FALLBACK_IMAGE = '/products/fallback.jpg';

const generateLuxuryPlaceholder = (title: string, category: string = 'Twinkle') => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const isPerfume = category.toUpperCase().includes('PERFUME');
  const colors = ['#F5F0EB', '#EADBC0', '#D4B88C', '#FDFCF8'];
  const bg = colors[Math.abs(hash) % colors.length];
  const accent = colors[(Math.abs(hash) + 1) % colors.length];
  
  const shape1 = `<circle cx="${50 + (hash % 50)}%" cy="${30 + (hash % 40)}%" r="${20 + (hash % 30)}%" fill="${accent}" fill-opacity="0.4" />`;
  const shape2 = `<circle cx="${20 + (hash % 60)}%" cy="${60 + (hash % 30)}%" r="${30 + (hash % 20)}%" fill="#FFFFFF" fill-opacity="0.5" />`;
  
  let iconPath = '';
  if (isPerfume) {
    iconPath = `<path d="M160 140 L240 140 L240 180 L280 220 L280 400 L120 400 L120 220 L160 180 Z" fill="none" stroke="#C5A059" stroke-width="2" /> <rect x="180" y="100" width="40" height="40" fill="#C5A059" fill-opacity="0.2" />`;
  } else {
    iconPath = `<circle cx="200" cy="250" r="80" fill="none" stroke="#C5A059" stroke-width="2" /> <circle cx="200" cy="250" r="60" fill="none" stroke="#D4B88C" stroke-width="1" stroke-dasharray="4 4" />`;
  }

  const svg = `<svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${bg}"/>${shape1}${shape2}${iconPath}<text x="50%" y="85%" font-family="serif" font-size="24" fill="#2C2825" text-anchor="middle" dominant-baseline="middle" font-style="italic" opacity="0.8">Twinkle</text><text x="50%" y="90%" font-family="sans-serif" font-size="10" fill="#756A62" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.2em" opacity="0.6">PREVIEW VISUAL</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = "", category = "Twinkle" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [useAIPlaceholder, setUseAIPlaceholder] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setIsLoading(true);
    setUseAIPlaceholder(false);
    if (src && (src.startsWith('http') || src.startsWith('//'))) {
      setUseAIPlaceholder(true);
      setIsLoading(false);
      return;
    }
    if (IS_PREVIEW_MODE) {
      setUseAIPlaceholder(true);
      setIsLoading(false);
      return;
    }
    if (!src) {
      setUseAIPlaceholder(true);
      setIsLoading(false);
      return;
    }
    setImgSrc(src);
    setUseAIPlaceholder(false);
  }, [src, alt]);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => { setUseAIPlaceholder(true); setIsLoading(false); };
  const aiVisual = generateLuxuryPlaceholder(alt, category);

  return (
    <div className={`relative overflow-hidden bg-sand-50 ${className}`}>
      {isLoading && !useAIPlaceholder && (
        <div className="absolute inset-0 bg-sand-100 z-10 flex items-center justify-center">
          <div className="w-full h-full animate-pulse bg-sand-200"></div>
          <div className="absolute w-8 h-8 border-2 border-champagne-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={useAIPlaceholder ? aiVisual : imgSrc} 
        alt={alt}
        className={`w-full h-full object-cover object-center transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      {useAIPlaceholder && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-1.5 border-t border-sand-200 flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-[9px] font-bold text-champagne-500 uppercase tracking-widest">
               <Sparkles size={10} /> <span>AI Preview</span>
            </div>
            <p className="text-[8px] text-charcoal-500 leading-tight px-2 mt-0.5">Final product image will appear in live site</p>
        </div>
      )}
    </div>
  );
};