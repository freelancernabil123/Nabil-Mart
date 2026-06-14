import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, ShieldCheck, ShoppingBag, Menu, X, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function Navbar() {
  const { cart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'threads'), where('unreadAdmin', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadMessagesCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/admin/dashboard" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight text-slate-800">
              <ShieldCheck className="text-purple-600" />
              Nabil Mart <span className="text-sm font-normal text-purple-400">Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/admin/products" className="text-slate-600 font-medium hover:text-purple-600 transition-colors">Products</Link>
              <Link to="/admin/orders" className="text-slate-600 font-medium hover:text-purple-600 transition-colors">Orders</Link>
              <Link to="/admin/messages" className="text-slate-600 font-medium hover:text-purple-600 transition-colors relative flex items-center gap-1">
                Messages
                {unreadMessagesCount > 0 && (
                  <span className="bg-red-500 shadow-sm text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {unreadMessagesCount}
                  </span>
                )}
              </Link>
              <Link to="/admin/settings" className="text-slate-600 font-medium hover:text-purple-600 transition-colors">Settings</Link>
              <Link to="/" className="text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all font-medium">View Store</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl tracking-tight flex-shrink-0 text-slate-800">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            Nabil<span className="text-purple-600">Mart</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-slate-600 hover:text-purple-600 transition-colors">Home</Link>
            
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-80 bg-slate-50 border border-slate-200 rounded-full py-2 px-4 text-sm focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 focus:outline-none text-slate-800 transition-all placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button onClick={() => navigate('/admin/login')} className="flex flex-col items-center text-slate-500 hover:text-purple-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">Admin</span>
              </button>

              <Link to="/cart" className="flex flex-col items-center text-slate-500 hover:text-purple-600 transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative text-slate-500 hover:text-purple-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-500 hover:text-purple-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md px-4 pt-4 pb-6 border-b border-purple-100 space-y-4 shadow-xl absolute w-full">
           <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-4 pr-10 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-400"
            />
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-600 hover:text-purple-600">Home</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-600 hover:text-purple-600">Cart ({cartItemsCount})</Link>
          <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-600 hover:text-purple-600">Admin Login</Link>
        </div>
      )}
    </nav>
  );
}
