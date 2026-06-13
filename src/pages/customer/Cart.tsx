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
        <div className="bg-blue-100 p-6 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
          <ShoppingBag className="w-16 h-16 text-blue-600 relative z-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <li key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-2xl bg-slate-100 flex-shrink-0"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-slate-900">{item.product.name}</h3>
                    <p className="text-sm text-slate-500 mb-2">{item.product.category}</p>
                    <p className="font-bold text-slate-900">৳ {item.product.price}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                <span>৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span>৳ {shipping}</span>
              </div>
              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">৳ {total}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
