import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { MENU_IMG_URL } from '../utils/constants';

const MenuItem = ({ itemInfo }) => {
  const dispatch = useDispatch();
  
  const { name, price, defaultPrice, description, imageId, isVeg } = itemInfo;
  
  // Swiggy uses paise, so divide by 100
  const itemPrice = price ? price / 100 : defaultPrice / 100;

  const handleAddItem = (e) => {
    e.stopPropagation(); // Prevents triggering parent onClick if any
    dispatch(addItem(itemInfo));
  };

  return (
    <div className="flex justify-between items-start pt-6 pb-12 border-b border-gray-200 dark:border-slate-800 last:border-b-0">
      
      {/* Details Section */}
      <div className="flex flex-col flex-1 pr-4">
        <div className="w-4 h-4 mb-2">
          {/* Custom Veg/Non-Veg icon rendering */}
          {isVeg === 1 ? (
             <div className="w-4 h-4 border-[1.5px] border-green-600 flex items-center justify-center rounded-[2px]">
               <div className="w-2 h-2 rounded-full bg-green-600"></div>
             </div>
          ) : (
             <div className="w-4 h-4 border-[1.5px] border-red-600 flex items-center justify-center rounded-[2px]">
               <div className="w-0 h-0 border-l-4 border-r-4 border-b-[6px] border-transparent border-b-red-600"></div>
             </div>
          )}
        </div>
        
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">{name}</h3>
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          ₹{itemPrice}
        </span>
        
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 md:line-clamp-none w-full md:w-[90%]">
          {description}
        </p>
      </div>

      {/* Image & Add Button Section */}
      <div className="relative w-[118px] h-[96px] sm:w-[156px] sm:h-[144px] shrink-0 ml-4 rounded-xl">
        {imageId ? (
          <img
            src={MENU_IMG_URL + imageId}
            alt={name}
            className="w-full h-full object-cover rounded-xl shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
            <span className="text-slate-400 text-xs text-center p-2">{name}</span>
          </div>
        )}
        
        {/* ADD Button Placed Absolute to Image */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24">
          <button 
            onClick={handleAddItem}
            className="w-full py-2 bg-white dark:bg-slate-900 text-green-600 dark:text-green-500 border border-gray-300 dark:border-slate-700 shadow-lg rounded-lg font-bold text-base hover:bg-gray-50 dark:hover:bg-slate-800 hover:shadow-xl transition-all"
          >
            ADD
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default MenuItem;
