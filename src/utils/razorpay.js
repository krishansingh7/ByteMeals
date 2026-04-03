import { loadScript } from './loadScript';
import toast from 'react-hot-toast';

export const initializeRazorpay = async (user, totalAmount, onSuccess, onFailure) => {
  if (!user) {
    if (onFailure) onFailure('User authentication missing');
    return false;
  }

  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    toast.error('Razorpay SDK failed to load. Are you online?');
    if (onFailure) onFailure('SDK Load Failed');
    return false;
  }

  // Dummy Razorpay Options config
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Test key required
    amount: Math.round(totalAmount * 100), // Currency absolute subunits (paise)
    currency: "INR",
    name: "ByteMeals",
    description: "Test Environment Transaction",
    image: "https://cdn-images-1.medium.com/max/1200/1*C4h1f610h6kX6s2Yh6pUXQ.png",
    handler: function (response) {
      if (onSuccess) onSuccess(response.razorpay_payment_id);
    },
    prefill: {
      name: user.displayName || "ByteMeals User",
      email: user.email || "test@example.com",
      contact: "9999999999", // Can be dynamically injected from Checkout form in production
    },
    theme: {
      color: "#fc8019",
    },
  };

  const paymentObject = new window.Razorpay(options);
  
  paymentObject.on('payment.failed', function (response) {
    toast.error('Payment Failed: ' + response.error.description);
    if (onFailure) onFailure(response.error.description);
  });
  
  paymentObject.open();
  return true;
};
