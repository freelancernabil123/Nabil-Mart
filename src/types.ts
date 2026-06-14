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
  chatSessionId?: string;
  deliveryNote?: string;
  expectedDeliveryTime?: string;
}

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad' | 'Rocket';

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  customerName: string;
  lastMessage: string;
  timestamp: string;
  unreadAdmin: boolean;
  unreadCustomer: boolean;
}
