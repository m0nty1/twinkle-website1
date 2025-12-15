import React from 'react';
import type { Metadata } from "next";
import { Inter, Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingChatWidget } from "../components/TwinkleAI";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cairo = Cairo({ subsets: ["arabic"], variable: '--font-cairo' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Twinkle | Perfumes & Accessories",
  description: "Premium bilingual e-commerce store for Perfumes and Accessories in Egypt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cairo.variable} ${playfair.variable} bg-cream text-charcoal-900 antialiased`}>
        <AppProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <FloatingChatWidget />
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}