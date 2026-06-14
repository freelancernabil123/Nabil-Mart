import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { products, addToCart } = useAppContext();

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-sm relative bg-gradient-to-br from-purple-100 via-white to-purple-50 border border-purple-100/60 transition-transform duration-500 hover:shadow-md">
        <div className="px-8 py-16 md:py-24 relative z-10 text-slate-800 flex flex-col items-center text-center">
          <span className="bg-white/60 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-sm backdrop-blur-md">Welcome Offer</span>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4 tracking-tight text-slate-900">Welcome to Nabil Mart</h1>
          <div className="text-base md:text-lg font-medium text-slate-600 max-w-4xl mt-6 text-left space-y-4 bg-white/60 p-8 rounded-2xl backdrop-blur-md border border-purple-100/50 shadow-sm">
            <p>Nabil Mart-এর ফুড ও গ্রোসারি সেকশন মূলত ব্যস্ত জীবনযাত্রায় আপনার খাঁটি ও সুস্বাদু খাবারের চাহিদা মেটাতে তৈরি। রান্নাঘরের নিত্যপ্রয়োজনীয় উপাদান থেকে শুরু করে ঝটপট ক্ষুধা মেটানোর স্ন্যাক্স—সবকিছুই পাবেন এক ক্লিকে।</p>
            
            <h3 className="text-xl font-display font-bold text-purple-700 mt-4">🍽️ Nabil Mart Food Items: স্বাদ ও স্বাস্থ্যের দারুণ মেলবন্ধন</h3>
            <p>প্রতিদিনের ব্যস্ত লাইফে রান্নার ঝক্কি কমাতে এবং খাঁটি খাবারের স্বাদ পেতে Nabil Mart আপনার জন্য নিয়ে এসেছে প্রিমিয়াম কোয়ালিটির ফুড ও গ্রোসারি আইটেম। আমরা বিশ্বাস করি, ভালো খাবারই সুস্থ জীবনের চাবিকাঠি।</p>
            
            <h4 className="text-lg font-bold text-slate-800 mt-4">🌟 আমাদের ফুড ক্যাটাগরিগুলো:</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong className="text-purple-600">নিত্যপ্রয়োজনীয় গ্রোসারি:</strong> প্রতিদিনের রান্নার জন্য সেরা মানের চাল, ডাল, তেল, খাঁটি ঘি এবং বাছাই করা সব মসলা।</li>
              <li><strong className="text-purple-600">ইনস্ট্যান্ট স্ন্যাক্স ও নুডলস:</strong> হুটকরে আসা ক্ষুধা মেটানোর জন্য রয়েছে বিভিন্ন ফ্লেভারের নুডলস, পাস্তা, চিপস এবং ক্রিসপি স্ন্যাক্স।</li>
              <li><strong className="text-purple-600">সুইট ট্রিটস ও বেভারেজ:</strong> মন ভালো করে দেওয়ার মতো প্রিমিয়াম চকলেট, বিস্কুট, কুকিজ এবং রিফ্রেশিং ড্রিংকস।</li>
              <li><strong className="text-purple-600">হেলদি অপশনস:</strong> ডায়েট সচেতনদের জন্য ওটস, কর্নফ্লেক্স এবং পুষ্টিকর ড্রাই ফ্রুটস (বাদাম, কিসমিস, খেজুর ইত্যাদি)।</li>
            </ul>

            <h4 className="text-lg font-bold text-slate-800 mt-4">✨ কেন আমাদের ফুড আইটেম সেরা?</h4>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong className="text-purple-600">১০০% খাঁটি ও তাজা:</strong> আমরা সরাসরি বিশ্বস্ত সোর্স থেকে পণ্য সংগ্রহ করি, তাই ভেজালের কোনো সুযোগ নেই।</li>
              <li><strong className="text-purple-600">হাইজিন ও সেফটি ফার্স্ট:</strong> প্রতিটি ফুড আইটেম অত্যন্ত স্বাস্থ্যকর পরিবেশে প্যাক এবং সংরক্ষণ করা হয়।</li>
              <li><strong className="text-purple-600">সঠিক মেয়াদ ও গুণগত মান:</strong> আমরা পণ্যের এক্সপায়ারি ডেট (Expiry Date) এবং গুণগত মান কঠোরভাবে যাচাই করে থাকি।</li>
            </ul>

            <p className="font-bold text-purple-700 mt-6 text-center">Nabil Mart-এর সাথে আপনার ডাইনিং টেবিল হোক আরও সমৃদ্ধ। সাশ্রয়ী মূল্যে সেরা ও খাঁটি খাবারটি বেছে নিতে আজই অর্ডার করুন!</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-display font-bold text-slate-800">Featured Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer border border-slate-100 hover:border-purple-200" onClick={() => setSelectedProduct(product)}>
            <div className="relative aspect-square overflow-hidden bg-slate-50 p-4">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500 mb-2">{product.category}</span>
              <h3 className="font-bold text-slate-800 mb-1 line-clamp-2 leading-snug">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-slate-500 mb-2 line-clamp-3">{product.description}</p>
              )}
              <div className="flex justify-between items-center mb-6 mt-auto">
                <p className="text-xl font-display font-bold text-slate-900">৳ {product.price}</p>
                <p className="text-sm font-medium text-slate-400">Stock: {product.stock}</p>
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="w-full flex items-center justify-center gap-2 bg-purple-50 text-purple-700 border border-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-600 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md"
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white border border-slate-100 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-video bg-slate-50 overflow-hidden p-6 border-b border-slate-100">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-contain" />
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-white transition-colors border border-slate-200 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 md:p-8 overflow-y-auto bg-white">
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
                {selectedProduct.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-2">{selectedProduct.name}</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-display font-bold text-purple-700">৳ {selectedProduct.price}</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md uppercase tracking-wider">
                  {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock})` : 'Out of Stock'}
                </span>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Description</h3>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">{selectedProduct.description}</p>
              </div>

              <button 
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                disabled={selectedProduct.stock <= 0}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 disabled:bg-slate-200 disabled:text-slate-400 text-white hover:bg-purple-700 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                {selectedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
