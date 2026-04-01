import React, { useState } from 'react';
import MenuItem from './MenuItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MenuCategory = ({ category }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const cardData = category?.card?.card || {};
  const { title, itemCards } = cardData;

  // Sometimes Swiggy returns sub-categories without itemCards at this level
  // To keep it simple, we check if itemCards exist
  if (!itemCards) {
    return null;
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b-8 border-slate-100 dark:border-black mx-auto">
      {/* Header */}
      <div 
        className="flex justify-between items-center px-4 py-5 cursor-pointer shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-extrabold text-lg text-[#3e4152] dark:text-slate-100">
          {title} ({itemCards.length})
        </h2>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-slate-500" />
        ) : (
          <ChevronDown className="w-6 h-6 text-slate-500" />
        )}
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="px-4 pb-4">
          {itemCards.map((item) => (
            <MenuItem key={item.card.info.id} itemInfo={item.card.info} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuCategory;
