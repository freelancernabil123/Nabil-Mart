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
          <div className="text-base md:text-lg font-medium text-blue-100 max-w-4xl mt-6 text-left space-y-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <p>Nabil Mart-এর ফুড ও গ্রোসারি সেকশন মূলত ব্যস্ত জীবনযাত্রায় আপনার খাঁটি ও সুস্বাদু খাবারের চাহিদা মেটাতে তৈরি। রান্নাঘরের নিত্যপ্রয়োজনীয় উপাদান থেকে শুরু করে ঝটপট ক্ষুধা মেটানোর স্ন্যাক্স—সবকিছুই পাবেন এক ক্লিকে।</p>
            
            <h3 className="text-xl font-bold text-white mt-4">🍽️ Nabil Mart Food Items: স্বাদ ও স্বাস্থ্যের দারুণ মেলবন্ধন</h3>
            <p>প্রতিদিনের ব্যস্ত লাইফে রান্নার ঝক্কি কমাতে এবং খাঁটি খাবারের স্বাদ পেতে Nabil Mart আপনার জন্য নিয়ে এসেছে প্রিমিয়াম কোয়ালিটির ফুড ও গ্রোসারি আইটেম। আমরা বিশ্বাস করি, ভালো খাবারই সুস্থ জীবনের চাবিকাঠি।</p>
            
            <h4 className="text-lg font-bold text-white mt-4">🌟 আমাদের ফুড ক্যাটাগরিগুলো:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>নিত্যপ্রয়োজনীয় গ্রোসারি:</strong> প্রতিদিনের রান্নার জন্য সেরা মানের চাল, ডাল, তেল, খাঁটি ঘি এবং বাছাই করা সব মসলা।</li>
              <li><strong>ইনস্ট্যান্ট স্ন্যাক্স ও নুডলস:</strong> হুটকরে আসা ক্ষুধা মেটানোর জন্য রয়েছে বিভিন্ন ফ্লেভারের নুডলস, পাস্তা, চিপস এবং ক্রিসপি স্ন্যাক্স।</li>
              <li><strong>সুইট ট্রিটস ও বেভারেজ:</strong> মন ভালো করে দেওয়ার মতো প্রিমিয়াম চকলেট, বিস্কুট, কুকিজ এবং রিফ্রেশিং ড্রিংকস।</li>
              <li><strong>হেলদি অপশনস:</strong> ডায়েট সচেতনদের জন্য ওটস, কর্নফ্লেক্স এবং পুষ্টিকর ড্রাই ফ্রুটস (বাদাম, কিসমিস, খেজুর ইত্যাদি)।</li>
            </ul>

            <h4 className="text-lg font-bold text-white mt-4">✨ কেন আমাদের ফুড আইটেম সেরা?</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>১০০% খাঁটি ও তাজা:</strong> আমরা সরাসরি বিশ্বস্ত সোর্স থেকে পণ্য সংগ্রহ করি, তাই ভেজালের কোনো সুযোগ নেই।</li>
              <li><strong>হাইজিন ও সেফটি ফার্স্ট:</strong> প্রতিটি ফুড আইটেম অত্যন্ত স্বাস্থ্যকর পরিবেশে প্যাক এবং সংরক্ষণ করা হয়।</li>
              <li><strong>সঠিক মেয়াদ ও গুণগত মান:</strong> আমরা পণ্যের এক্সপায়ারি ডেট (Expiry Date) এবং গুণগত মান কঠোরভাবে যাচাই করে থাকি।</li>
            </ul>

            <p className="font-bold text-white mt-4">Nabil Mart-এর সাথে আপনার ডাইনিং টেবিল হোক আরও সমৃদ্ধ। সাশ্রয়ী মূল্যে সেরা ও খাঁটি খাবারটি বেছে নিতে আজই অর্ডার করুন!</p>
          </div>
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
