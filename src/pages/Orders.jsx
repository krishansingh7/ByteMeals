import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BASE_IMG_URL } from '../utils/constants';

const OrderCard = ({ order, now }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simulate varying statuses dynamically internally based on time passed
  const minsPassed = (now - new Date(order.date).getTime()) / 60000;
  let derivedStatus = "Preparing";
  let statusColor = "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-500/20";
  
  if (minsPassed > 35) {
    derivedStatus = "Delivered";
    statusColor = "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20";
  } else if (minsPassed > 15) {
    derivedStatus = "On the Way";
    statusColor = "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20";
  }

  const totalItemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">
      
      {/* Header Core */}
      <div className="p-5 sm:p-6 pb-4 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex flex-wrap justify-between items-start border-b border-dashed border-gray-200 dark:border-slate-700 pb-4 mb-4 gap-4">
           <div className="flex flex-col">
             <span className="text-xs font-bold text-gray-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                Order Placed
             </span>
             <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                {new Date(order.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
             </span>
           </div>
           
           <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gray-400 dark:text-slate-500 tracking-wider uppercase mb-1">
                Total
              </span>
              <span className="font-black text-gray-900 dark:text-white text-lg">
                ₹{Math.round(order.total)}
              </span>
           </div>
        </div>

        {/* Action Toggle Strip */}
        <div className="flex justify-between items-center text-sm">
           <div className="flex items-center gap-2">
             <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${statusColor}`}>
                {derivedStatus}
             </span>
             <span className="font-semibold text-gray-500 dark:text-slate-400 text-xs tracking-wider">
                | ID: {order.id.split('_').pop().toUpperCase()}
             </span>
           </div>

           <button className="flex items-center gap-1 font-bold text-orange-500 hover:text-orange-600 dark:text-orange-400 transition-colors">
              {isExpanded ? 'Hide Details' : `View ${totalItemsCount} Items`}
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
           </button>
        </div>
      </div>

      {/* Expandable Items List */}
      <div 
        className={`bg-gray-50 dark:bg-slate-800/40 border-t border-gray-100 dark:border-slate-800 transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] opacity-100 p-5 sm:p-6' : 'max-h-0 opacity-0 overflow-hidden py-0 px-5 sm:px-6'
        }`}
      >
         <h4 className="font-black tracking-wide text-xs text-gray-400 dark:text-slate-500 uppercase mb-4">Items in this order</h4>
         <div className="flex flex-col gap-4">
            {order.items.map((item, i) => {
              const itemPrice = (item.price || item.defaultPrice || 0) / 100;
              return (
                <div key={i} className="flex items-start gap-4">
                   {item.imageId ? (
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm flex-shrink-0">
                       <img src={BASE_IMG_URL + item.imageId} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                     </div>
                   ) : (
                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-400 font-bold text-xl">{item.name?.charAt(0)}</span>
                     </div>
                   )}
                   
                   <div className="flex-1 flex flex-col pt-1">
                      <h5 className="font-bold text-gray-800 dark:text-slate-200 text-sm sm:text-base leading-tight mb-1">
                        {item.name}
                      </h5>
                      {item.isVeg !== undefined && (
                        <div className="flex items-center gap-1.5 mb-2">
                           <span className={`w-3 h-3 border grid place-items-center rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                           </span>
                           <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{item.isVeg ? 'VEG' : 'NON-VEG'}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-semibold text-gray-500 dark:text-slate-400 text-sm">
                           {item.quantity} x ₹{itemPrice}
                        </span>
                        <span className="font-extrabold text-gray-800 dark:text-gray-200">
                           ₹{itemPrice * item.quantity}
                        </span>
                      </div>
                   </div>
                </div>
              );
            })}
         </div>
      </div>

    </div>
  );
};

const Orders = () => {
  const { items: orders } = useSelector((state) => state.orders);
  const [now] = React.useState(() => Date.now());

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-48 h-48 sm:w-64 sm:h-64 mb-8">
           <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="No Orders" className="w-full h-full object-contain opacity-75" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#3e4152] dark:text-slate-100 mb-2">No Past Orders Found</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 text-center max-w-sm">
          You haven't placed any orders yet. Discover the best food around you.
        </p>
        <Link to="/" className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-md transition-colors uppercase text-sm tracking-wide">
          See Restaurants Near You 
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 min-h-[75vh]">
      <div className="mb-8 flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-slate-100">Past Orders</h1>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <OrderCard key={order.id || index} order={order} now={now} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
