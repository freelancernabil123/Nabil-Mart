import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Bluetooth Earbuds',
    description: 'High-quality sound with deep bass and noise cancellation. Up to 20 hours of battery life.',
    price: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    category: 'Electronics',
    stock: 50
  },
  {
    id: 'p2',
    name: "Men's Casual Running Shoes",
    description: 'Lightweight and breathable sneakers perfect for daily running or casual wear.',
    price: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    category: 'Fashion',
    stock: 30
  },
  {
    id: 'p3',
    name: 'Smart Watch Fitness Tracker',
    description: 'Track your steps, heart rate, and sleep. Water-resistant and connects to any smartphone.',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600',
    category: 'Electronics',
    stock: 20
  },
  {
    id: 'p4',
    name: 'Leather Wallet for Men',
    description: 'Genuine leather slim wallet with multiple card slots and RFID protection.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600',
    category: 'Fashion',
    stock: 100
  },
  {
    id: 'p5',
    name: 'Digital Air Fryer 4L',
    description: 'Oil-free cooking with digital touch screen and pre-set cooking modes.',
    price: 6500,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1723829035677-47cace5dc87c?q=80&w=600&auto=format&fit=crop',
    category: 'Home Appliances',
    stock: 15
  },
  {
    id: 'p6',
    name: 'Pure Cotton Bedsheet Set',
    description: 'King size 100% cotton double bedsheet with two matching pillow covers.',
    price: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1522771731478-44fb669f6974?auto=format&fit=crop&q=80&w=600',
    category: 'Home & Lifestyle',
    stock: 40
  }
];
