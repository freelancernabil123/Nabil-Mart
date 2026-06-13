import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Package, DollarSign, ShoppingBag, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { orders, products, isAdminAuthenticated, logoutAdmin } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) return null;

  const totalRevenue = orders
    .filter(o => o.orderStatus !== 'Cancelled')
    .reduce((acc, order) => acc + order.total, 0);
  
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending').length;

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/settings')}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
          >
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-indigo-900">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Total Revenue</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-indigo-950">৳ {totalRevenue}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-blue-900">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Total Orders</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-950">{orders.length}</p>
          </div>
        </div>

        <div 
          onClick={() => navigate('/admin/products')}
          className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col text-white cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <Package className="w-5 h-5" />
            <h3 className="text-sm font-bold uppercase tracking-wider">Products</h3>
          </div>
          <div>
            <p className="text-4xl font-bold text-white">{products.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
          <button onClick={() => navigate('/admin/orders')} className="text-sm bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-colors">View All Orders</button>
        </div>
        
        {orders.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
                  <th className="p-4 font-medium">Order ID</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map(order => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{order.id}</td>
                    <td className="p-4 text-slate-600">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="p-4 text-slate-600">{order.customerDetails.name}</td>
                    <td className="p-4 font-medium text-slate-900">৳ {order.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.orderStatus === 'Pending' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold' :
                        order.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold' :
                        order.orderStatus === 'Cancelled' ? 'bg-pink-50 text-pink-700 border border-pink-100 font-bold' :
                        'bg-blue-50 text-blue-700 border border-blue-100 font-bold'
                      }`}>
                        {order.orderStatus}
                      </span>
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
