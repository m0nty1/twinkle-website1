import React from 'react';
import { ChatWindow } from '../components/TwinkleAI';

const AIChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-sand-200 flex flex-col md:flex-row">
        
        {/* Sidebar Info */}
        <div className="w-full md:w-1/3 bg-cream p-8 border-r border-sand-100 flex flex-col justify-center text-center md:text-left">
           <h1 className="text-4xl font-serif-title text-charcoal-900 mb-4">Twinkle AI</h1>
           <p className="text-charcoal-600 mb-8 leading-relaxed font-light">
             Your personal luxury advisor. Ask about scents, styling, or gifts, and let us guide you to your perfect match.
           </p>
           
           <div className="space-y-4 text-sm text-charcoal-500">
             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
               <span className="text-2xl">🎁</span>
               <span>Gift Recommendations</span>
             </div>
             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
               <span className="text-2xl">✨</span>
               <span>Perfume Matching</span>
             </div>
             <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
               <span className="text-2xl">💬</span>
               <span>Instant Support</span>
             </div>
           </div>
        </div>

        {/* Chat Interface */}
        <div className="w-full md:w-2/3 h-full">
           <ChatWindow isFullPage={true} />
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;