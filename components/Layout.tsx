import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Phone, MapPin, Instagram, Facebook, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, isAdmin } = useStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-royal-900 text-gold-100 shadow-lg border-b border-gold-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-gold-400 leading-none group-hover:text-gold-300 transition-colors">
              Sufiyana Darbar
            </span>
            <span className="text-[10px] md:text-xs tracking-wider text-gray-400 uppercase mt-1 group-hover:text-gold-200 transition-colors">
              Restaurant & Banquet
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`transition-colors duration-200 font-medium ${isActive(link.path) ? 'text-gold-400 border-b-2 border-gold-400' : 'hover:text-gold-400'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-royal-700">
              <Link to="/auth" className="p-2 hover:text-gold-400 transition-colors" title="Login / Sign Up">
                <User className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="relative p-2 hover:text-gold-400 transition-colors" title="Cart">
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative p-2 text-gold-100">
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold-400">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-royal-800 border-t border-royal-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path) ? 'bg-royal-900 text-gold-400' : 'text-gray-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white flex items-center gap-2"
              >
                <User className="w-4 h-4"/> Login / Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-royal-900 text-gray-300 pt-16 pb-8 border-t-4 border-gold-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl text-gold-400 mb-2">Sufiyana Darbar</h3>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Restaurant & Banquet</p>
          <p className="mb-4 text-sm leading-relaxed">
            Experience the royal flavors of the Mughal era. A culinary journey through history, spices, and tradition.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gold-400 hover:text-white"><Instagram className="w-5 h-5"/></a>
            <a href="#" className="text-gold-400 hover:text-white"><Facebook className="w-5 h-5"/></a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
              <span>123 Royal Heritage Road,<br/>Connaught Place, New Delhi</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold-500 shrink-0" />
              <span>+91 98765 43210</span>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Opening Hours</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Mon - Thu</span>
              <span className="text-gold-100">12:00 PM - 11:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Fri - Sun</span>
              <span className="text-gold-100">12:00 PM - 12:00 AM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-royal-800 mt-12 pt-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Sufiyana Darbar Restaurant & Banquet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 bg-pattern font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};