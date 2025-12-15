"use client";
import React from 'react';
import { ChatWindow } from '../../components/TwinkleAI';

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-sand-200 flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-cream p-8 border-r border-sand-100 flex flex-col justify-center text-center md:text-left">
           <h1 className="text-4xl font-serif text-charcoal-900 mb-4">Twinkle AI</h1>
           <p className="text-charcoal-600 mb-8 leading-relaxed font-light">
             Your personal luxury advisor. Ask about scents, styling, or gifts.
           </p>
        </div>
        <div className="w-full md:w-2/3 h-full">
           <ChatWindow isFullPage={true} />
        </div>
      </div>
    </div>
  );
}