import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Order } from '../types';
import { initialProducts } from '../data/mockData';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isAdminAuthenticated: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (orderDetails: Omit<Order, 'id' | 'date' | 'orderStatus'>) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  loginAdmin: (username?: string, password?: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (username: string, password: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAdminAuthenticated');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('isAdminAuthenticated', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (orderDetails: Omit<Order, 'id' | 'date' | 'orderStatus'>) => {
    const newOrder: Order = {
      ...orderDetails,
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      orderStatus: 'Pending'
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
  };

  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('adminCredentials');
    return saved ? JSON.parse(saved) : { username: 'admin', password: 'admin123' };
  });

  useEffect(() => {
    localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  const loginAdmin = (username?: string, password?: string) => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const updateAdminCredentials = (newUser: string, newPass: string) => {
    setAdminCredentials({ username: newUser, password: newPass });
  };

  const addProduct = (product: Product) => setProducts(prev => [product, ...prev]);
  const updateProduct = (updatedProduct: Product) => setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <AppContext.Provider value={{
      products, cart, orders, isAdminAuthenticated,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      placeOrder, updateOrderStatus,
      loginAdmin, logoutAdmin, updateAdminCredentials, addProduct, updateProduct, deleteProduct
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
