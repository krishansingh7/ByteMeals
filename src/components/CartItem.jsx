import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../redux/cartSlice';
import { MENU_IMG_URL } from '../utils/constants';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddItem = () => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(item.id));
  };

  const itemPrice = item.price ? item.price / 100 : item.defaultPrice / 100;
  const itemTotalPrice = (itemPrice * item.quantity).toFixed(0);

  return (
    <div className="flex justify-between items-center sm:items-start border-b pb-4 border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-lg transition-colors">
      
      {/* Product Info */}
      <div className="flex items-start gap-4 flex-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          {item.imageId ? (
            <img src={MENU_IMG_URL + item.imageId} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <span className="flex items-center justify-center h-full w-full text-xs text-slate-400">No Image</span>
          )}
        </div>
        <div className="flex flex-col justify-center h-full gap-1 pt-1 pr-2">
           <span className="font-semibold text-slate-800 dark:text-slate-200 text-[15px] sm:text-base line-clamp-2">
             {item.name}
           </span>
           <span className="font-semibold text-sm text-slate-600 dark:text-slate-400">
             ₹{itemPrice}
           </span>
        </div>
      </div>
      
      {/* Quantity & Total Price Controls */}
      <div className="flex items-center gap-4 py-2 sm:py-0">
        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 h-8 sm:h-10 shadow-sm">
          <button 
            onClick={handleRemoveItem}
            className="px-3 sm:px-4 h-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-orange-500 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-bold"
          >
            -
          </button>
          <span className="font-semibold text-sm w-4 flex justify-center text-green-600 dark:text-green-500 select-none">
            {item.quantity}
          </span>
          <button 
            onClick={handleAddItem}
            className="px-3 sm:px-4 h-full flex items-center justify-center text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-slate-700 transition font-bold text-lg"
          >
            +
          </button>
        </div>
        <span className="w-14 sm:w-16 text-right font-bold text-[#3e4152] dark:text-slate-200 text-sm sm:text-base">
          ₹{itemTotalPrice}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
