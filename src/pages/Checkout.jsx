import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: 'New Delhi', // Default matching Swiggy mock location
    pinCode: '',
  });

  // Basic guard (handled natively via ProtectedRoute, but good for empty items)
  if (!user || items.length === 0) {
    if (!user) toast.error('Authentication Required');
    navigate(items.length === 0 ? '/' : '/login');
    return null;
  }

  const totalAmount = items.reduce((acc, item) => {
    const itemPrice = item.price ? item.price / 100 : item.defaultPrice / 100;
    return acc + itemPrice * item.quantity;
  }, 0);
  const finalPay = totalAmount + 5 + totalAmount * 0.05;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!formData.addressLine1 || !formData.city || !formData.pinCode) {
      toast.error("Please fill in all mandatory address fields.");
      return;
    }
    
    // In a real app we'd dispatch Address to Redux or Firebase.
    toast.success("Address Confirmed!");
    navigate('/payment');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">
      
      {/* Checkout Breadcrumb */}
      <div className="mb-8 flex items-center text-sm font-semibold text-slate-500">
        <Link to="/cart" className="hover:text-orange-500 transition-colors">Cart</Link>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-800 dark:text-slate-200">Checkout Delivery</span>
        <span className="mx-2 text-slate-300">/</span>
        <span className="text-slate-400">Payment</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Delivery Details Form */}
        <div className="w-full md:w-2/3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-800">
             <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
               Delivery Details
             </h2>
             {user?.photoURL && (
               <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full shadow-sm" />
             )}
          </div>
          
          <form onSubmit={handleAddressSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Full Name</label>
                 <input 
                   type="text" name="name" value={formData.name} onChange={handleInputChange} required
                   className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Phone Number*</label>
                 <input 
                   type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="10-digit mobile number"
                   className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
                 />
               </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Email Address</label>
               <input 
                 type="email" name="email" value={formData.email} onChange={handleInputChange} required disabled
                 className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none bg-slate-100 dark:bg-slate-800/50 text-slate-500 cursor-not-allowed"
               />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Flat / House No / Floor / Building*</label>
               <input 
                 type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} required
                 className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
               />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Area / Sector / Locality</label>
               <input 
                 type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange}
                 className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
               />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-400">City*</label>
                 <input 
                   type="text" name="city" value={formData.city} onChange={handleInputChange} required
                   className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
                 />
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-sm font-bold text-slate-600 dark:text-slate-400">PIN Code*</label>
                 <input 
                   type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} required
                   className="p-3 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:border-orange-500 dark:bg-slate-800 dark:text-white transition-colors"
                 />
               </div>
            </div>

            <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors mt-4">
              SAVE AND PROCEED TO PAYMENT
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm sticky top-24">
             <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-4 border-b pb-4 dark:border-slate-800">
               Order Summary
             </h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-semibold">
               {items.length} Items securely reserved for {user.displayName}
             </p>
             
             <div className="flex flex-col gap-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                     <span className="text-slate-700 dark:text-slate-300 line-clamp-1 flex-1 pr-2">
                       {item.quantity} x {item.name}
                     </span>
                     <span className="text-slate-800 dark:text-slate-200 shrink-0">
                       ₹{((item.price ? item.price / 100 : item.defaultPrice / 100) * item.quantity).toFixed(0)}
                     </span>
                  </div>
                ))}
                {items.length > 3 && (
                  <div className="text-xs font-bold text-orange-500 italic">
                    + {items.length - 3} more items...
                  </div>
                )}
             </div>

             <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center font-extrabold text-[#3e4152] dark:text-slate-100 text-xl">
                <span>Total Payable</span>
                <span>₹{finalPay.toFixed(0)}</span>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
