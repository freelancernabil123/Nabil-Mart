import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, ShieldCheck, ShoppingBag, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { cart } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <ShieldCheck className="text-blue-600" />
              Nabil Mart <span className="text-sm font-normal text-slate-500">Admin</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/admin/products" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/admin/orders" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">Orders</Link>
              <Link to="/admin/settings" className="text-slate-600 font-medium hover:text-blue-600 transition-colors">Settings</Link>
              <Link to="/" className="text-sm bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">View Store</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight flex-shrink-0 text-slate-900">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            Nabil<span className="text-blue-600">Mart</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-80 bg-slate-100 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-900"
              />
            </div>

            <div className="flex items-center space-x-6">
              <button onClick={() => navigate('/admin/login')} className="flex flex-col items-center text-slate-600 hover:text-blue-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">Admin</span>
              </button>

              <Link to="/cart" className="flex flex-col items-center text-slate-600 hover:text-blue-600 transition-colors relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs mt-1 font-medium">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative text-slate-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-50 px-4 pt-2 pb-4 border-b border-slate-200 space-y-4">
           <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-4 pr-10 py-2 rounded-full border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-500"
            />
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-700 hover:text-blue-600">Home</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-700 hover:text-blue-600">Cart ({cartItemsCount})</Link>
          <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block font-medium py-2 text-slate-700 hover:text-blue-600">Admin Login</Link>
        </div>
      )}
    </nav>
  );
}
