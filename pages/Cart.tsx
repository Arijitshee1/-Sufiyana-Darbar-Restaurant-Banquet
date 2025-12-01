import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button, Input, SectionTitle } from '../components/UI';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/data';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const navigate = useNavigate();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createOrder({
        customerName: formData.name,
        customerPhone: formData.phone,
        items: cart,
        total: cartTotal,
        paymentMethod: 'cod' // Simplified
      });
      clearCart();
      setStep('success');
    } catch (err) {
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-serif text-royal-800 mb-4">Your Royal Feast Awaits</h2>
        <p className="text-gray-500 mb-8">Your cart is currently empty.</p>
        <Link to="/menu">
          <Button>Browse Menu</Button>
        </Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-serif text-royal-800 mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you, {formData.name}. The kitchen has received your order. 
          We will contact you at {formData.phone} if needed.
        </p>
        <Button onClick={() => navigate('/menu')}>Order More</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <SectionTitle title={step === 'cart' ? "Your Cart" : "Checkout"} center />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          {step === 'cart' ? (
             <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
               {cart.map(item => (
                 <div key={item.id} className="flex items-center p-4 border-b last:border-0 hover:bg-gray-50">
                   <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                   <div className="ml-4 flex-grow">
                     <h4 className="font-bold text-royal-800">{item.name}</h4>
                     <p className="text-gray-500 text-sm">₹{item.price} x {item.quantity}</p>
                   </div>
                   <div className="flex items-center gap-3">
                     <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-full hover:bg-gray-200">
                       <Minus className="w-4 h-4" />
                     </button>
                     <span className="font-medium w-6 text-center">{item.quantity}</span>
                     <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-full hover:bg-gray-200">
                       <Plus className="w-4 h-4" />
                     </button>
                     <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          ) : (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
              <Input label="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <Input label="Phone Number" type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-700">Delivery Address</label>
                <textarea 
                  required
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-royal-800 focus:outline-none"
                  rows={3}
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Payment Method</h4>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 border p-3 rounded-md w-full cursor-pointer bg-gold-100 border-gold-400">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 border p-3 rounded-md w-full opacity-50 cursor-not-allowed bg-gray-50">
                    <input type="radio" name="payment" disabled />
                    <span>Online (Unavailable in Demo)</span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gold-100 sticky top-24">
            <h3 className="text-xl font-serif font-bold text-royal-800 mb-4 border-b pb-2">Order Summary</h3>
            <div className="space-y-2 mb-4 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (5%)</span>
                <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-royal-900 pt-2 border-t">
                <span>Total</span>
                <span>₹{(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>

            {step === 'cart' ? (
              <Button onClick={() => setStep('checkout')} className="w-full text-lg">
                Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-3">
                <Button type="submit" form="checkout-form" className="w-full text-lg" isLoading={loading}>
                  Confirm Order
                </Button>
                <Button variant="outline" onClick={() => setStep('cart')} className="w-full">
                  Back to Cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};