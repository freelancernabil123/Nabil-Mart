/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/customer/Home';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import TrackOrder from './pages/customer/TrackOrder';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';
import AdminMessages from './pages/admin/AdminMessages';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans flex flex-col selection:bg-purple-200 selection:text-purple-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<TrackOrder />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Routes>
          </main>

          
          <ChatWidget />

          <footer className="bg-white border-t border-purple-100 text-slate-400 py-8 text-center text-sm relative z-10">
            <p>&copy; {new Date().getFullYear()} Nabil Mart. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-4">
              <a href="https://www.facebook.com/Mnnabil.2024/" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-600 font-medium transition-colors">
                Follow us on Facebook
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
