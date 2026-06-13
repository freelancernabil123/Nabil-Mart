export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerDetails: {
    name: string;
    phone: string;
    address: string;
  };
  items: CartItem[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Rocket';
