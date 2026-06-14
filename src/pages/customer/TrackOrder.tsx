import React, { useState } from 'react';
import { Search, MapPin, Clock, Package, AlertCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Order } from '../../types';

export default function TrackOrder() {
  const { orders } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Search by order ID or phone number
    const found = orders.find(o => 
      o.id.toLowerCase() === query || 
      o.customerDetails.phone.includes(query)
    );
    
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold text-slate-900 mb-8 text-center">Track Your Order</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Enter Order ID or Mobile Number" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all font-medium"
            />
          </div>
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md"
          >
            Track
          </button>
        </form>
      </div>

      {hasSearched && !searchedOrder && (
        <div className="text-center text-slate-500 py-12 bg-white rounded-3xl border border-slate-100 shadow-sm mb-12">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-lg">No order found with that ID or Phone Number.</p>
          <p className="text-sm mt-1">Please double-check and try again.</p>
        </div>
      )}

      {searchedOrder && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-slate-100 pb-6 mb-6 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Order ID</p>
              <p className="text-xl font-bold text-slate-900">{searchedOrder.id}</p>
            </div>
            <div className="md:text-right">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border
                ${
                  searchedOrder.orderStatus === 'Pending' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                  searchedOrder.orderStatus === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                  searchedOrder.orderStatus === 'Shipped' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                  searchedOrder.orderStatus === 'Delivered' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                  'bg-pink-50 border-pink-200 text-pink-700'
                }
              `}>
                {searchedOrder.orderStatus}
              </span>
              <p className="text-sm font-medium text-slate-500 mt-2">
                Placed on {new Date(searchedOrder.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                Delivery Details
              </h3>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="font-bold text-slate-900 mb-1">{searchedOrder.customerDetails.name}</p>
                <p className="text-slate-600 mb-2">{searchedOrder.customerDetails.phone}</p>
                <p className="text-slate-600">{searchedOrder.customerDetails.address}</p>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-2 rounded-lg text-purple-600 shadow-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Expected Delivery</p>
                    <p className="text-purple-700 font-bold text-lg mt-0.5">
                      {searchedOrder.expectedDeliveryTime || 'Standard timeframe (2-4 Days)'}
                    </p>
                  </div>
                </div>
              </div>

              {searchedOrder.deliveryNote && (
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <p className="font-bold text-amber-900 text-sm mb-1">Delivery Update</p>
                  <p className="text-amber-800 text-sm">{searchedOrder.deliveryNote}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-purple-600" />
                Order Items
              </h3>
              <div className="space-y-4">
                {searchedOrder.items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-4 border border-slate-100 p-3 rounded-xl">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.imageUrl || 'https://via.placeholder.com/150'} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-bold text-slate-900 pl-4 border-l border-slate-100">
                      ৳{item.product.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Payment Method: {searchedOrder.paymentMethod}</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">Status: {searchedOrder.paymentStatus}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-1 font-medium">Total Amount</p>
                  <p className="text-2xl font-bold text-purple-700">৳{searchedOrder.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
