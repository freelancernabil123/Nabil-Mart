import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export default function Orders() {
  const { orders, updateOrderStatus, updateOrderDetails, isAdminAuthenticated } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">All Orders</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Order details</th>
                  <th className="p-4 font-medium">Customer Info</th>
                  <th className="p-4 font-medium">Items</th>
                  <th className="p-4 font-medium">Payment & Delivery</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 border-t border-slate-100">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors align-top">
                    <td className="p-4">
                      <p className="font-bold text-slate-900">{order.id}</p>
                      <p className="text-xs text-slate-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                      <p className="font-bold text-blue-600 mt-2">৳ {order.total}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-900">{order.customerDetails.name}</p>
                      <p className="text-sm text-slate-600 mt-1">{order.customerDetails.phone}</p>
                      <p className="text-sm text-slate-600 mt-1 max-w-[200px]">{order.customerDetails.address}</p>
                    </td>
                    <td className="p-4">
                      <ul className="text-sm text-slate-600 space-y-1">
                        {order.items.map(item => (
                          <li key={item.product.id} className="flex gap-2">
                            <span className="font-medium text-slate-900">{item.quantity}x</span>
                            <span className="truncate max-w-[150px]" title={item.product.name}>{item.product.name}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4">
                      <div className="space-y-3">
                        <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-200">
                          {order.paymentMethod}
                        </span>
                        
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Expected Delivery</label>
                          <input 
                            type="text" 
                            placeholder="e.g. 2 Days, 10th Aug" 
                            defaultValue={order.expectedDeliveryTime}
                            onBlur={(e) => updateOrderDetails(order.id, { expectedDeliveryTime: e.target.value })}
                            className="w-full text-sm px-2 py-1 border border-slate-200 rounded focus:outline-none focus:border-blue-300"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-slate-500 mb-1">Delivery Note / Internal Reason</label>
                          <textarea 
                            rows={2}
                            placeholder="Reason for delay or delivery update..." 
                            defaultValue={order.deliveryNote}
                            onBlur={(e) => updateOrderDetails(order.id, { deliveryNote: e.target.value })}
                            className="w-full text-sm px-2 py-1 border border-slate-200 rounded focus:outline-none focus:border-blue-300"
                          ></textarea>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                          ${
                            order.orderStatus === 'Pending' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                            order.orderStatus === 'Processing' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                            order.orderStatus === 'Shipped' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                            order.orderStatus === 'Delivered' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                            'bg-pink-50 border-pink-200 text-pink-700'
                          }
                        `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
