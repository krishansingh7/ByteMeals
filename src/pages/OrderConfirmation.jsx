import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const paymentId = location.state?.paymentId;

  const [deliveryTime] = useState(() => {
    const future = new Date(Date.now() + 35 * 60000);
    return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  // Protect route strictly avoiding direct navigations
  if (!paymentId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[75vh] px-4 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-sm max-w-lg w-full flex flex-col items-center text-center">
        
        {/* Animated Checkmark Circle */}
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-[#3e4152] dark:text-slate-100 mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
          Thank you for choosing ByteMeals. Your food is currently being prepared.
        </p>

        <div className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 flex flex-col gap-4 border border-slate-100 dark:border-slate-700/50 mb-8">
           <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700/50 pb-4">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Order ID:</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase">{paymentId}</span>
           </div>
           <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Estimated Delivery:</span>
              <span className="text-lg font-extrabold text-orange-500">{deliveryTime}</span>
           </div>
        </div>

        <Link to="/" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-md transition-all text-lg">
          Track Another Order
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
