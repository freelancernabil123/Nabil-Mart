import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 60 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-full mb-6 relative shadow-sm">
          <div className="absolute inset-0 bg-purple-200 rounded-full animate-ping opacity-30"></div>
          <ShoppingBag className="w-16 h-16 text-purple-500 relative z-10" />
        </div>
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-purple-50/30 transition-colors">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-2xl bg-slate-50 flex-shrink-0 border border-slate-100"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-800 mb-1 leading-snug">{item.product.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">{item.product.category}</p>
                    <p className="font-display font-bold text-slate-900">৳ {item.product.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between">
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-3 text-slate-500 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-3 text-slate-500 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-24">
            <h2 className="text-lg font-display font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span className="font-bold text-slate-800">৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span className="font-bold text-slate-800">৳ {shipping}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between font-display font-bold text-lg text-slate-900">
                <span>Total</span>
                <span className="text-purple-700">৳ {total}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold transition-all shadow-md mt-8 hover:shadow-lg"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
