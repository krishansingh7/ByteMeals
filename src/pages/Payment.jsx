import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { addOrder } from '../redux/ordersSlice';
import { initializeRazorpay } from '../utils/razorpay';
import toast from 'react-hot-toast';

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('initializing');
  const calledRef = useRef(false);

  useEffect(() => {
    // Basic route protection
    if (!user || items.length === 0) {
      navigate('/cart');
      return;
    }
    
    // Prevent double invocation in React StrictMode
    if (calledRef.current) return;
    calledRef.current = true;

    triggerPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerPayment = async () => {
    setPaymentStatus('processing');
    
    const totalAmount = items.reduce((acc, item) => {
      const itemPrice = item.price ? item.price / 100 : item.defaultPrice / 100;
      return acc + itemPrice * item.quantity;
    }, 0);
    const finalPay = totalAmount + 5 + totalAmount * 0.05;

    const onSuccess = (paymentId) => {
      toast.success('Payment Secured!');
      
      // Inject persistent order object before wiping the cart 
      dispatch(addOrder({
         id: paymentId,
         date: new Date().toISOString(),
         total: finalPay,
         items: [...items],
         status: 'Preparing',
      }));

      dispatch(clearCart());
      navigate('/order-confirmation', { state: { paymentId } });
    };

    const onFailure = () => {
      setPaymentStatus('failed');
    };

    const isInitialized = await initializeRazorpay(user, finalPay, onSuccess, onFailure);
    
    if (!isInitialized) {
      setPaymentStatus('failed');
    } else {
      // The Razorpay modal is open over the UI. 
      setPaymentStatus('waiting_for_user');
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center flex flex-col items-center gap-6">
          
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          
          <h2 className="text-2xl font-extrabold text-[#3e4152] dark:text-slate-100">
            {paymentStatus === 'processing' && 'Connecting to Secure Server...'}
            {paymentStatus === 'waiting_for_user' && 'Awaiting Payment Completion...'}
            {paymentStatus === 'failed' && 'Payment Interrupted'}
          </h2>
          
          <p className="text-slate-500 dark:text-slate-400 font-medium">
             {paymentStatus === 'failed' 
                ? 'Your transaction could not be completed. You can safely retry.' 
                : 'Please do not close or refresh this window window while we process your request securely.'}
          </p>

          {paymentStatus === 'failed' && (
            <div className="mt-4 flex gap-4 w-full">
              <button onClick={() => navigate('/checkout')} className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                Go Back
              </button>
              <button onClick={() => { calledRef.current=false; triggerPayment(); }} className="flex-1 px-4 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition">
                Retry Payment 
              </button>
            </div>
          )}
          
          {paymentStatus !== 'failed' && (
            <div className="mt-2 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <span>Secured by</span>
               <span className="text-[#0256B2]">Razorpay</span>
            </div>
          )}
       </div>
    </div>
  );
};

export default Payment;
