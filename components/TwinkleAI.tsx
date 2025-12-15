import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, Sparkles, ShoppingBag, Loader2 } from 'lucide-react';
import { useAppContext } from '../App';
import { DataService } from '../services/dataService';
import { AIService } from '../services/aiService';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';

// --- Types ---
interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  recommendations?: Product[];
}

// --- Hook ---
const useTwinkleChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'model', 
      text: 'Hello, beautiful! ✨ I am your personal Twinkle advisor. Looking for a new scent or a matching accessory today?' 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatSession = useRef<any>(null); // Keep chat session persistent
  const { addToCart } = useAppContext();

  useEffect(() => {
    // Initialize chat on mount
    const products = DataService.getProducts();
    chatSession.current = AIService.createChat(products);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      if (!chatSession.current) {
        // Re-init if lost
        const products = DataService.getProducts();
        chatSession.current = AIService.createChat(products);
      }

      const result = await chatSession.current.sendMessage({ message: text });
      const rawText = result.text;
      const { text: cleanText, recommendations } = AIService.parseResponse(rawText);

      // Resolve product IDs to objects
      const allProducts = DataService.getProducts();
      const recProducts = recommendations
        .map(id => allProducts.find(p => p.id === id))
        .filter((p): p is Product => !!p);

      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: cleanText,
        recommendations: recProducts
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I'm feeling a bit faint... could you please ask me that again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, loading, sendMessage, addToCart };
};

// --- Sub-Components ---

const RecProductCard: React.FC<{ product: Product, onAdd: (p: Product, q: number) => void }> = ({ product, onAdd }) => (
  <div className="flex gap-3 bg-white p-3 rounded-lg border border-sand-100 shadow-sm mt-3 w-full max-w-[280px]">
    <div className="w-16 h-16 flex-shrink-0 rounded-md bg-gray-50 overflow-hidden">
       <ProductImage src={product.images[0]} alt={product.title} category={product.category} />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-bold text-charcoal-900 truncate">{product.title}</h4>
      <p className="text-xs text-champagne-500 font-medium">{product.price} EGP</p>
      <div className="flex gap-2 mt-2">
        <Link to={`/product/${product.id}`} className="text-[10px] underline text-charcoal-500 hover:text-charcoal-900">View</Link>
        <button 
          onClick={() => onAdd(product, 1)}
          className="ml-auto text-[10px] bg-charcoal-900 text-cream px-2 py-1 rounded-sm hover:bg-champagne-500 transition"
        >
          Add to Bag
        </button>
      </div>
    </div>
  </div>
);

export const ChatWindow: React.FC<{ onClose?: () => void, isFullPage?: boolean }> = ({ onClose, isFullPage = false }) => {
  const { messages, loading, sendMessage, addToCart } = useTwinkleChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex flex-col bg-cream/95 backdrop-blur-sm overflow-hidden ${isFullPage ? 'h-full shadow-none' : 'h-[600px] w-[380px] rounded-2xl shadow-2xl border border-sand-200'}`}>
      
      {/* Header */}
      <div className="bg-sand-100 p-4 flex justify-between items-center border-b border-sand-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-champagne-100 flex items-center justify-center border border-white shadow-sm">
            <Sparkles size={18} className="text-champagne-500" />
          </div>
          <div>
            <h3 className="font-serif-title font-bold text-charcoal-900">Twinkle AI</h3>
            <span className="text-[10px] uppercase tracking-widest text-green-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-charcoal-500 hover:text-charcoal-900 transition">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`
              max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-charcoal-800 text-cream rounded-2xl rounded-tr-none' 
                : 'bg-white text-charcoal-800 rounded-2xl rounded-tl-none border border-sand-100'}
            `}>
              {msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)}
            </div>
            
            {/* Recommendations */}
            {msg.recommendations && msg.recommendations.length > 0 && (
              <div className="mt-2 space-y-2 animate-fade-in-up">
                {msg.recommendations.map(prod => (
                  <RecProductCard key={prod.id} product={prod} onAdd={addToCart} />
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && (
           <div className="flex items-start">
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-sand-100 shadow-sm flex gap-1">
                <span className="w-1.5 h-1.5 bg-champagne-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-champagne-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-champagne-400 rounded-full animate-bounce delay-150"></span>
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-sand-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); setInput(''); }}
          className="flex gap-2 items-center"
        >
          <input 
            type="text" 
            className="flex-1 bg-sand-50 border-none rounded-full px-4 py-3 text-sm focus:ring-1 focus:ring-champagne-400 focus:outline-none transition"
            placeholder="Ask about perfumes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="p-3 bg-champagne-400 text-white rounded-full hover:bg-champagne-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 animate-fade-in-up origin-bottom-right">
           <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
          ${isOpen ? 'bg-charcoal-800 text-cream rotate-0' : 'bg-champagne-400 text-white hover:bg-champagne-500'}
        `}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && <span className="font-bold text-sm tracking-wide">Ask Twinkle</span>}
      </button>
    </div>
  );
};