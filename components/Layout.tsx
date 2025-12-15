import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import { ShoppingBag, Menu, X, User, LogOut, Heart } from 'lucide-react';
import { FloatingChatWidget } from './TwinkleAI';

const Layout: React.FC = () => {
  const { t, language, toggleLanguage, cart, user, setUser, isRTL } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream transition-colors duration-300">
      {/* Top Bar - Elegant Nude */}
      <div className="bg-sand-100 text-charcoal-800 py-2 text-center text-[11px] uppercase tracking-[0.2em] font-medium border-b border-sand-200">
        Free Shipping on Orders over 1500 EGP
      </div>

      {/* Navbar - Glassmorphic Cream */}
      <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-sand-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-charcoal-800 hover:text-champagne-500 transition">
                {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Logo - Centered */}
            <div className="flex-shrink-0 flex items-center justify-center flex-1 md:flex-none">
              <Link to="/" className="flex flex-col items-center group">
                <span className="text-3xl font-serif-title font-normal text-charcoal-900 tracking-[0.15em] group-hover:text-champagne-500 transition duration-300">
                  TWINKLE
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-charcoal-600">Perfume & Co</span>
              </Link>
            </div>

            {/* Desktop Navigation - Clean Serif/Sans mix */}
            <div className="hidden md:flex space-x-10 rtl:space-x-reverse items-center justify-center flex-1">
              <Link to="/" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.home}</Link>
              <Link to="/shop" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.shop}</Link>
              <Link to="/shop?cat=perfumes" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300">{t.perfumes}</Link>
              <Link to="/ai-chat" className="text-charcoal-600 hover:text-champagne-500 uppercase text-[11px] tracking-[0.15em] font-medium transition duration-300 flex items-center gap-1">
                 Twinkle AI
              </Link>
            </div>

            {/* Right Icons - Minimalist */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button 
                onClick={toggleLanguage} 
                className="text-xs font-serif-title text-charcoal-800 hover:text-champagne-500 px-2"
              >
                {t.language}
              </button>
              
              {user ? (
                 <div className="relative group">
                   <button onClick={() => navigate('/admin')} className="p-2 text-charcoal-800 hover:text-champagne-500 transition">
                     <User size={20} strokeWidth={1.5} />
                   </button>
                   <div className="absolute right-0 mt-4 w-48 bg-cream border border-sand-200 rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                      <div className="px-4 py-3 text-xs text-charcoal-600 border-b border-sand-100 tracking-wide">Hi, {user.name}</div>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-xs text-red-500 hover:bg-sand-50 flex items-center gap-2 uppercase tracking-wide">
                        <LogOut size={12}/> Logout
                      </button>
                   </div>
                 </div>
              ) : (
                <Link to="/login" className="p-2 hidden md:block text-charcoal-800 hover:text-champagne-500 transition">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              {/* Wishlist Placeholder */}
              <button className="p-2 hidden md:block text-charcoal-800 hover:text-champagne-500 transition">
                 <Heart size={20} strokeWidth={1.5} />
              </button>

              <Link to="/cart" className="p-2 text-charcoal-800 hover:text-champagne-500 transition relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold leading-none text-white bg-champagne-400 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-cream border-t border-sand-100 absolute w-full left-0 z-40 animate-fade-in-down shadow-xl">
            <div className="py-6 space-y-4 flex flex-col items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.home}</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.shop}</Link>
              <Link to="/shop?cat=perfume" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.perfumes}</Link>
              <Link to="/ai-chat" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">Twinkle AI</Link>
              {!user && <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-charcoal-800 hover:text-champagne-500 uppercase text-xs tracking-widest">{t.login}</Link>}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />

      {/* Footer - Warm Sand instead of Black */}
      <footer className="bg-sand-100 text-charcoal-800 pt-16 pb-8 border-t border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left rtl:md:text-right">
            
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start rtl:md:items-end">
              <h3 className="text-3xl font-serif-title text-charcoal-900 mb-4 tracking-widest">TWINKLE</h3>
              <p className="text-charcoal-600 text-sm leading-relaxed max-w-xs font-light">
                Where elegance meets everyday style. Premium scents and accessories curated for the modern muse.
              </p>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">{t.shop}</h4>
              <ul className="space-y-3 text-charcoal-600 text-sm font-light">
                <li><Link to="/shop?cat=perfume" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">{t.perfumes}</Link></li>
                <li><Link to="/shop?cat=accessory" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">{t.accessories}</Link></li>
                <li><Link to="/shop?cat=bundle" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">Bundles</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">Support</h4>
              <ul className="space-y-3 text-charcoal-600 text-sm font-light">
                <li><Link to="#" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">FAQ</Link></li>
                <li><Link to="#" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">Shipping & Returns</Link></li>
                <li><Link to="#" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">Care Guide</Link></li>
                <li><Link to="#" className="hover:text-champagne-500 transition underline-offset-4 hover:underline">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-champagne-500">Social</h4>
              <div className="flex justify-center md:justify-start rtl:md:justify-end space-x-6 rtl:space-x-reverse">
                <a href="#" className="text-charcoal-600 hover:text-champagne-500 transition">Instagram</a>
                <a href="#" className="text-charcoal-600 hover:text-champagne-500 transition">Facebook</a>
                <a href="#" className="text-charcoal-600 hover:text-champagne-500 transition">TikTok</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-sand-200 text-center flex flex-col md:flex-row justify-between items-center text-charcoal-500 text-[10px] uppercase tracking-wider">
            <span>{t.footerText}</span>
            <span className="mt-2 md:mt-0">Designed with Elegance</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;