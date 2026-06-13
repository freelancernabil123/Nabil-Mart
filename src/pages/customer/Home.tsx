import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { products, addToCart } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-lg relative border border-slate-200">
        <div className="absolute inset-0 bg-white/5 mix-blend-overlay"></div>
        <div className="px-8 py-16 md:py-24 relative z-10 text-white flex flex-col items-center text-center">
          <span className="bg-white/20 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md mb-6">Welcome Offer</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 italic tracking-tight">Welcome to Nabil Mart</h1>
          <p className="text-lg md:text-xl font-medium text-blue-100 max-w-2xl">
            Everything you need, delivered right to your door. Shop the latest electronics, fashion, and home goods today.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-6 flex flex-col flex-grow bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">{product.category}</span>
              <h3 className="font-bold text-slate-900 mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xl font-bold text-slate-900 mb-6 mt-auto">৳ {product.price}</p>
              
              <button 
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-bold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
