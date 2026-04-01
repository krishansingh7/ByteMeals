import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addItem, removeItem, clearCart } from '../redux/cartSlice';
import { MENU_IMG_URL } from '../utils/constants';
import { loadScript } from '../utils/loadScript';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Derived state
  const totalAmount = items.reduce((acc, item) => {
    const itemPrice = item.price ? item.price / 100 : item.defaultPrice / 100;
    return acc + itemPrice * item.quantity;
  }, 0);

  const displayRazorpay = async () => {
    if (!user) {
      toast.error('Please login to place your order.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setIsProcessing(false);
      return;
    }

    // Dummy Razorpay Options config
    const options = {
      key: 'rzp_test_YourTestKey', // Replace with your test key if you want real tracking
      amount: totalAmount * 100, // Amount is in currency subunits (paise)
      currency: 'INR',
      name: 'Swiggy Clone',
      description: 'Test Environment Transaction',
      image: 'https://cdn-images-1.medium.com/max/1200/1*C4h1f610h6kX6s2Yh6pUXQ.png',
      handler: function (response) {
        toast.success(`Payment Successful! Order ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart());
        navigate('/');
      },
      prefill: {
        name: user.displayName || 'Test User',
        email: user.email || 'test@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#fc8019',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      toast.error('Payment Failed: ' + response.error.description);
    });
    
    paymentObject.open();
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 space-y-6">
        <div className="w-64 h-64 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
           {/* Placeholder empty cart image */}
           <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="empty cart" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm">
          You can go to home page to view more restaurants
        </p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded hover:bg-orange-600 transition">
          SEE RESTAURANTS NEAR YOU
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-[70vh]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Items */}
        <div className="w-full md:w-2/3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm">
          <h2 className="text-xl font-extrabold mb-6 dark:text-white border-b pb-4 dark:border-slate-800">
            Cart Items
          </h2>
          
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center sm:items-start border-b pb-4 dark:border-slate-800 last:border-0">
                
                {/* Product Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    {item.imageId ? (
                      <img src={MENU_IMG_URL + item.imageId} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full text-xs text-slate-400">No Image</span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center h-full gap-1 pt-1">
                     <span className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] sm:text-base line-clamp-2">
                       {item.name}
                     </span>
                     <span className="font-semibold text-sm text-slate-600 dark:text-slate-400">
                       ₹{item.price ? item.price / 100 : item.defaultPrice / 100}
                     </span>
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 h-8 sm:h-10">
                    <button 
                      onClick={() => dispatch(removeItem(item.id))}
                      className="px-3 sm:px-4 leading-none text-slate-600 dark:text-slate-300 hover:text-orange-500 font-bold"
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm w-4 flex justify-center text-green-600 dark:text-green-500">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => dispatch(addItem(item))}
                      className="px-3 sm:px-4 leading-none text-green-600 dark:text-green-500 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-16 text-right font-bold text-[#3e4152] dark:text-slate-200 text-sm sm:text-base">
                    ₹{((item.price ? item.price / 100 : item.defaultPrice / 100) * item.quantity).toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Bill Details */}
        <div className="w-full md:w-1/3">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 shadow-sm sticky top-24">
             <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-6 border-b pb-4 dark:border-slate-800 flex justify-between items-center">
               Bill Details
               <button onClick={() => dispatch(clearCart())} className="text-xs text-red-500 font-semibold hover:underline">
                 Clear Cart
               </button>
             </h3>
             
             <div className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{totalAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                  <span>Delivery Fee</span>
                  <span className="text-slate-500 line-through">₹45</span>
                  <span className="text-green-600 dark:text-green-500 ml-auto">FREE</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span>Platform fee</span>
                  <span>₹5</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-slate-900 dark:border-white border-dashed">
                  <span>GST and Restaurant Charges</span>
                  <span>₹{(totalAmount * 0.05).toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-[#3e4152] dark:text-slate-200 text-lg">
                  <span>TO PAY</span>
                  <span>₹{(totalAmount + 5 + totalAmount * 0.05).toFixed(0)}</span>
                </div>
             </div>

             <button
               disabled={isProcessing}
               onClick={displayRazorpay}
               className={`w-full font-bold text-white uppercase text-[15px] py-4 rounded-xl shadow-lg mt-8 transition-all ${isProcessing ? 'bg-orange-400' : 'bg-primary hover:bg-orange-600 hover:shadow-xl'}`}
             >
               {isProcessing ? 'Processing...' : 'Proceed To Pay'}
             </button>
             <p className="text-[10px] text-center text-slate-400 mt-3 font-semibold">
               * This is a Dummy Project Checkout Route *
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
