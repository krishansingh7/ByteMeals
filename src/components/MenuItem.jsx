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
    <div className="flex justify-between items-start pt-6 pb-12 border-b border-gray-200 dark:border-slate-800 last:border-b-0 group">
      
      {/* Details Section */}
      <div className="flex flex-col flex-1 pr-4">
        
        {/* Badges Row */}
        <div className="flex items-center gap-2 mb-2">
          {/* Veg/Non-Veg icon */}
          {isVeg === 1 ? (
             <div className="w-[18px] h-[18px] border-[1.5px] border-green-600 flex items-center justify-center rounded-[3px]">
               <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
             </div>
          ) : (
             <div className="w-[18px] h-[18px] border-[1.5px] border-red-600 flex items-center justify-center rounded-[3px]">
               <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-transparent border-b-red-600"></div>
             </div>
          )}
          
          {/* Bestseller Simulation based on high ratings (or actual API flag) */}
          {(itemInfo.isBestseller || (itemInfo.ratings?.aggregatedRating?.rating && parseFloat(itemInfo.ratings.aggregatedRating.rating) >= 4.0)) && (
            <div className="flex items-center text-[#e46d47] font-bold text-[13px] tracking-tight">
               <svg className="w-4 h-4 mr-0.5 fill-[#e46d47]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
               Bestseller
            </div>
          )}
        </div>
        
        {/* Core Metadata */}
        <h3 className="font-bold text-[17px] text-[#3e4152] dark:text-slate-100 mb-1 leading-tight">{name}</h3>
        <span className="font-medium text-[#3e4152] dark:text-slate-300 text-[15px]">
          ₹{itemPrice}
        </span>
        
        {/* Rating String (if available) */}
        {itemInfo.ratings?.aggregatedRating?.rating && (
          <div className="flex items-center gap-1 mt-1.5 mb-1.5">
             <span className="text-[#1ba672] font-bold text-[13px] flex items-center">
               <svg className="w-3.5 h-3.5 mr-0.5 fill-[#1ba672]" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
               {itemInfo.ratings.aggregatedRating.rating}
             </span>
             {itemInfo.ratings.aggregatedRating.ratingCountV2 && (
               <span className="text-slate-500 font-medium text-[13px]">
                 ({itemInfo.ratings.aggregatedRating.ratingCountV2})
               </span>
             )}
          </div>
        )}
        
        {/* Description */}
        <p className="mt-3 text-sm text-[rgba(40,44,63,0.6)] dark:text-slate-400/90 leading-snug line-clamp-2 md:line-clamp-none w-full md:w-[90%] font-medium">
          {description}
        </p>
      </div>

      {/* Image & High-Contrast Add Button Section */}
      <div className="relative w-[130px] h-[120px] sm:w-[156px] sm:h-[144px] shrink-0 ml-4 rounded-xl">
        {imageId ? (
          <img
            src={MENU_IMG_URL + imageId}
            alt={name}
            className="w-full h-full object-cover rounded-xl shadow-sm"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
            <span className="text-slate-400 text-[10px] text-center p-2 font-medium break-words uppercase tracking-widest">{name}</span>
          </div>
        )}
        
        {/* Swiggy Signature White ADD Button */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[100px] sm:w-[110px] flex flex-col items-center">
          <button 
            onClick={handleAddItem}
            className="w-full py-2 bg-white text-[#1ba672] border border-[#d4d5d9] shadow-[0_3px_8px_rgba(0,0,0,0.15)] rounded-lg font-extrabold text-[15px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-gray-50 transition-all uppercase tracking-tight z-10 block"
          >
            ADD
          </button>
          
          <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 font-semibold tracking-wide">
            Customisable
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default MenuItem;
