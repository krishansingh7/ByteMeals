import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { MENU_IMG_URL } from '../utils/constants';

const MenuItemCard = ({ itemInfo }) => {
  const dispatch = useDispatch();
  
  const { name, price, defaultPrice, description, imageId, isVeg } = itemInfo;
  const itemPrice = price ? price / 100 : defaultPrice / 100;

  const handleAddItem = (e) => {
    e.stopPropagation();
    dispatch(addItem(itemInfo));
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all h-full group">
      
      {/* Image Header */}
      <div className="relative w-full h-40 bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {imageId ? (
          <img
            src={MENU_IMG_URL + imageId}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
             <svg className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
        )}

        {/* Absolute Veg Icon Overlay */}
        <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 p-1 rounded-md backdrop-blur-sm shadow-sm">
           {isVeg === 1 ? (
              <div className="w-3 h-3 border border-green-600 flex items-center justify-center rounded-[2px]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
              </div>
           ) : (
              <div className="w-3 h-3 border border-red-600 flex items-center justify-center rounded-[2px]">
                <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-transparent border-b-red-600"></div>
              </div>
           )}
        </div>
      </div>
      
      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1 line-clamp-2 leading-tight">{name}</h3>
        <span className="font-extrabold text-slate-800 dark:text-slate-200 mb-2">
          ₹{itemPrice}
        </span>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 mt-1 flex-1">
          {description || "A delicious addition to your meal."}
        </p>

        {/* Footer Add Button */}
        <button 
          onClick={handleAddItem}
          className="w-full mt-auto py-2.5 bg-slate-50 dark:bg-slate-800 text-green-600 dark:text-green-500 border border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-green-500 hover:text-white hover:border-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:hover:border-green-600 transition-all uppercase text-sm tracking-wide"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
};

export default MenuItemCard;
