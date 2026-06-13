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
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Products from './pages/admin/Products';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Routes>
          </main>
          
          <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Nabil Mart. All rights reserved.</p>
            <p className="mt-2 text-xs">Note: This is a simulated application without a backend database.</p>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
