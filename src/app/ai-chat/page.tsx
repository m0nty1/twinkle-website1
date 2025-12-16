"use client";
import React from 'react';
import { ChatWindow } from '../../components/TwinkleAI';

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[80vh] bg-white shadow-2xl flex overflow-hidden">
         <div className="w-1/3 bg-primary text-white p-12 hidden md:flex flex-col justify-between">
            <div>
               <h1 className="text-4xl font-serif mb-6">AI Advisor</h1>
               <p className="text-zinc-400 text-sm leading-relaxed">
                 Expert guidance available 24/7. Ask about scent notes, occasion matching, or find the perfect gift.
               </p>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent">Powered by Gemini</div>
         </div>
         <div className="flex-1">
            <ChatWindow isFullPage={true} />
         </div>
      </div>
    </div>
  );
}
