import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import toast from 'react-hot-toast';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Derived state
  const totalAmount = items.reduce((acc, item) => {
    const itemPrice = item.price ? item.price / 100 : item.defaultPrice / 100;
    return acc + itemPrice * item.quantity;
  }, 0);

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error('Please login to place your order.');
      navigate('/login');
      return;
    }
    navigate('/checkout');
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
              <CartItem key={item.id} item={item} />
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
               onClick={handleProceedToCheckout}
               className="w-full font-bold text-white uppercase text-[15px] py-4 rounded-xl shadow-lg mt-8 transition-all bg-primary hover:bg-orange-600 hover:shadow-xl"
             >
               Proceed to Checkout
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
