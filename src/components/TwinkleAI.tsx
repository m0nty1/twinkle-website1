"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Sparkles, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { DataService } from '../services/dataService';
import { AIService } from '../services/aiService';
import { Product } from '../lib/types';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  recommendations?: Product[];
}

const useTwinkleChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'model', text: 'Welcome to Twinkle. How may I assist you in finding your signature scent today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const chatSession = useRef<any>(null);
  const { addToCart } = useAppContext();

  useEffect(() => {
    const products = DataService.getProducts();
    chatSession.current = AIService.createChat(products);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      if (!chatSession.current) {
        const products = DataService.getProducts();
        chatSession.current = AIService.createChat(products);
      }
      const result = await chatSession.current.sendMessage({ message: text });
      const { text: cleanText, recommendations } = AIService.parseResponse(result.text);
      const allProducts = DataService.getProducts();
      const recProducts = recommendations.map(id => allProducts.find(p => p.id === id)).filter((p): p is Product => !!p);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'model', text: cleanText, recommendations: recProducts };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Apologies, I was momentarily distracted. Could you repeat that?" }]);
    } finally {
      setLoading(false);
    }
  };
  return { messages, loading, sendMessage, addToCart };
};

const RecProductCard: React.FC<{ product: Product, onAdd: (p: Product, q: number) => void }> = ({ product, onAdd }) => (
  <div className="flex gap-3 bg-zinc-50 p-2 rounded border border-zinc-200 mt-2">
    <div className="w-12 h-12 flex-shrink-0 bg-white">
       <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[10px] font-bold uppercase truncate">{product.title}</h4>
      <p className="text-[10px] text-zinc-500">{product.price} EGP</p>
      <div className="flex gap-2 mt-1">
        <Link to={`/product/${product.id}`} className="text-[9px] underline text-zinc-500">View</Link>
        <button onClick={() => onAdd(product, 1)} className="ml-auto text-[9px] bg-primary text-white px-2 py-0.5 rounded-sm">Add</button>
      </div>
    </div>
  </div>
);

export const ChatWindow: React.FC<{ onClose?: () => void, isFullPage?: boolean }> = ({ onClose, isFullPage = false }) => {
  const { messages, loading, sendMessage, addToCart } = useTwinkleChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div className={`flex flex-col bg-white overflow-hidden ${isFullPage ? 'h-full shadow-none' : 'h-[500px] w-[350px] shadow-2xl border border-zinc-200'}`}>
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <h3 className="font-serif text-sm tracking-widest">TWINKLE AI</h3>
        </div>
        {onClose && <button onClick={onClose}><X size={16} /></button>}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] px-3 py-2 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-zinc-200 text-primary' : 'bg-white border border-zinc-100 text-zinc-600'}`}>
              {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
            {msg.recommendations && msg.recommendations.map(prod => <RecProductCard key={prod.id} product={prod} onAdd={addToCart} />)}
          </div>
        ))}
        {loading && <div className="p-2 text-zinc-400"><Loader2 size={16} className="animate-spin"/></div>}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 bg-white border-t border-zinc-100">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }} className="flex gap-2">
          <input type="text" className="flex-1 bg-transparent border-b border-zinc-200 text-sm focus:border-accent focus:outline-none py-2" placeholder="Ask me anything..." value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" disabled={!input.trim() || loading} className="p-2 text-primary hover:text-accent"><Send size={16} /></button>
        </form>
      </div>
    </div>
  );
};

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && <div className="mb-4"><ChatWindow onClose={() => setIsOpen(false)} /></div>}
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-center w-12 h-12 shadow-xl transition-all duration-300 ${isOpen ? 'bg-zinc-800 text-white rotate-45' : 'bg-primary text-white hover:bg-accent'}`}>
        {isOpen ? <X size={20} /> : <Sparkles size={20} />}
      </button>
    </div>
  );
};
