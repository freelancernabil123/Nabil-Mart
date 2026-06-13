import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';
import { PaymentMethod } from '../../types';

export default function Checkout() {
  const { cart, placeOrder } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash on Delivery');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = 60;
  const total = subtotal + shipping;

  React.useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    placeOrder({
      customerDetails: {
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}`
      },
      items: cart,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid'
    });
    
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Thank you for exploring Nabil Mart. Your order has been received and will be processed soon. We will contact you shortly.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Detailed Address</label>
                  <textarea required name="address" rows={3} value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['Cash on Delivery', 'bKash', 'Nagad', 'Rocket'] as PaymentMethod[]).map(method => (
                  <label key={method} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === method ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'}`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value={method} 
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="ml-3 font-bold text-slate-900">{method}</span>
                  </label>
                ))}
              </div>
              
              {paymentMethod !== 'Cash on Delivery' && (
                <div className="mt-4 p-4 border border-blue-100 bg-blue-50 rounded-lg text-sm text-blue-800">
                  <p>Please send <strong>৳ {total}</strong> to our {paymentMethod} number: <strong>017XXXXXXXX</strong></p>
                  <p className="mt-2 text-xs">Note: In a real application, you would enter your transaction ID here or be redirected to a payment gateway.</p>
                </div>
              )}
            </div>
            
          </form>
        </div>
        
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm text-slate-600">
                  <span className="font-medium">{item.quantity}x {item.product.name}</span>
                  <span className="font-bold text-slate-900">৳ {item.product.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600 mb-2">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold text-slate-900">৳ {subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Shipping Fee</span>
                  <span className="font-bold text-slate-900">৳ {shipping}</span>
                </div>
              </div>
              
              <div className="border-t border-slate-100 pt-4 flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">৳ {total}</span>
              </div>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-colors shadow-lg shadow-blue-200 mt-8"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
