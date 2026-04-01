import React from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../hooks/useRestaurantMenu';
import MenuCategory from '../components/MenuCategory';
import { Star, Clock, IndianRupee } from 'lucide-react';

const RestaurantMenu = () => {
  const { id } = useParams();
  const { resInfo, menuCategories, isLoading, error } = useRestaurantMenu(id);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 w-full">
        <div className="animate-pulse flex flex-col gap-6">
          <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full"></div>
          <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-xl w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !resInfo) {
    return (
      <div className="text-center mt-20 text-xl font-bold text-gray-800 dark:text-gray-200">
        Failed to load restaurant menu. 
      </div>
    );
  }

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRatingString,
    totalRatingsString,
    areaName,
    sla
  } = resInfo;

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-0 py-8 min-h-screen">
      
      {/* Page Title / Breadcrumb Placeholder */}
      <div className="text-[10px] text-slate-500 mb-6 uppercase tracking-wider font-semibold">
        Home / {resInfo.city} / {name}
      </div>

      {/* Restaurant Header Section */}
      <h1 className="text-2xl font-bold text-[#282c3f] dark:text-white mb-6 pl-2">
        {name}
      </h1>
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-[0px_4px_16px_rgba(0,0,0,0.08)] mb-8 border border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-base text-[#3e4152] dark:text-slate-200 mb-2">
          <div className="bg-green-600 rounded-full p-1 shadow-sm">
             <Star className="w-4 h-4 text-white fill-white" />
          </div>
          <span>{avgRatingString} ({totalRatingsString})</span>
          <span className="text-slate-400">•</span>
          <span>{costForTwoMessage}</span>
        </div>
        
        {/* Cuisines & Location */}
        <p className="text-sm font-bold text-[#ff5200] underline underline-offset-4 cursor-pointer mb-2">
          {cuisines?.join(', ')}
        </p>
        
        <div className="flex flex-col gap-1 text-sm text-[#535665] dark:text-slate-400 font-medium">
          <div className="flex items-center gap-3">
             <div className="w-2 rounded-full h-2 bg-slate-300"></div>
             <span>Outlet <span className="text-slate-500 font-normal ml-1">{areaName}</span></span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 rounded-full h-2 bg-slate-300"></div>
             <span>{sla?.slaString}</span>
          </div>
        </div>
      </div>

      <div className="text-center tracking-[0.2em] text-[#3e4152] dark:text-slate-300 font-medium my-8">
        ~ MENU ~
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {menuCategories.map((category, index) => (
           <MenuCategory key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
