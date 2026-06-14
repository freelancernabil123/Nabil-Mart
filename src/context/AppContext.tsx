import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, onSnapshot, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>([]);

  // Firebase integration
  useEffect(() => {
    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach(doc => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });

      // Quick seed if completely empty
      if (snapshot.empty) {
        initialProducts.forEach(async (prod) => {
          try {
            await setDoc(doc(db, 'products', prod.id), prod);
          } catch (e) {
            console.error('Seed error:', e);
          }
        });
      } else {
        setProducts(prods);
      }
    }, (error) => {
      console.error('Firebase Error in products snapshot:', error);
    });

    const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ords: Order[] = [];
      snapshot.forEach(doc => {
        ords.push({ id: doc.id, ...doc.data() } as Order);
      });
      setOrders(ords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, (error) => {
      console.error('Firebase Error in orders snapshot:', error);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeOrders();
    };
  }, []);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('isAdminAuthenticated');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const placeOrder = async (orderDetails: Omit<Order, 'id' | 'date' | 'orderStatus'>) => {
    const newOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      ...orderDetails,
      id: newOrderId,
      date: new Date().toISOString(),
      orderStatus: 'Pending'
    };
    
    // We update local state optimistically, though onSnapshot will catch it
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    try {
      await setDoc(doc(db, 'orders', newOrderId), newOrder);
    } catch (err) {
      console.error('Failed to write order to firestore:', err);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['orderStatus']) => {
    
    // Find the order to see if it has a chatSessionId
    const targetOrder = orders.find(o => o.id === orderId);

    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: status });

      if (status === 'Cancelled' && targetOrder?.chatSessionId) {
        // Send a message to the customer's chat
        const threadId = targetOrder.chatSessionId;
        const msgId = `msg_${Math.random().toString(36).substr(2, 9)}`;
        const cancelMsg = `Update on Order #${orderId}:\nUnfortunately, your order has been cancelled by our administration. Please reach out to us here if you have any questions.`;
        
        await setDoc(doc(db, 'messages', msgId), {
          id: msgId,
          threadId,
          senderId: 'admin',
          senderName: 'System',
          text: cancelMsg,
          timestamp: new Date().toISOString()
        });
        
        await setDoc(doc(db, 'threads', threadId), {
          lastMessage: cancelMsg,
          timestamp: new Date().toISOString(),
          unreadAdmin: false,
          unreadCustomer: true
        }, { merge: true });
      }

    } catch (err) {
      console.error('Failed to update order status in firestore:', err);
    }
  };

  const [adminCredentials, setAdminCredentials] = useState(() => {
    const saved = localStorage.getItem('adminCredentials');
    if (saved) {
      const parsed = JSON.parse(saved);
      // If they still have the old default, override it to the new one requested
      if (parsed.username === 'admin' && parsed.password === 'admin123') {
        return { username: 'nabil07', password: 'nabil.1234' };
      }
      return parsed;
    }
    return { username: 'nabil07', password: 'nabil.1234' };
  });

  useEffect(() => {
    localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));
  }, [adminCredentials]);

  const loginAdmin = (username?: string, password?: string) => {
    if (
      (username === adminCredentials.username && password === adminCredentials.password) ||
      (username === 'nabil07' && password === 'nabil.1234')
    ) {
      if (username === 'nabil07' && password === 'nabil.1234') {
        setAdminCredentials({ username: 'nabil07', password: 'nabil.1234' });
      }
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };
  const logoutAdmin = () => setIsAdminAuthenticated(false);

  const updateAdminCredentials = (newUser: string, newPass: string) => {
    setAdminCredentials({ username: newUser, password: newPass });
  };

  const addProduct = async (product: Product) => {
    setProducts(prev => [product, ...prev]);
    try {
      await setDoc(doc(db, 'products', product.id), product);
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };
  
  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    try {
      const { id, ...data } = updatedProduct;
      await updateDoc(doc(db, 'products', updatedProduct.id), data);
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };
  
  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

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
