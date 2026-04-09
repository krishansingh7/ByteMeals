import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { BASE_IMG_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {
  const {
    id,
    name,
    cuisines,
    avgRatingString,
    costForTwo,
    sla,
    cloudinaryImageId,
    areaName,
    aggregatedDiscountInfoV3
  } = resData?.info || {};

  // Swiggy shows discount text overlaid on the image "GET 50% OFF"
  const discountHeader = aggregatedDiscountInfoV3?.header;
  const discountSubHeader = aggregatedDiscountInfoV3?.subHeader;
  
  return (
    <Link 
      to={`/restaurant/${id}`} 
      className="group block relative w-full hover:scale-95 transition-transform duration-300 cursor-pointer"
    >
      {/* Image Container with specific aspect ratio */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-sm">
        <img
          className="w-full h-full object-cover"
          src={BASE_IMG_URL + cloudinaryImageId}
          alt={name}
          loading="lazy"
        />
        
        {/* Gradient Overlay for discount text */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        {(discountHeader || discountSubHeader) ? (
          <div className="absolute bottom-2 left-3 right-3 flex flex-col pointer-events-none truncate text-ellipsis">
            <span className="text-white font-extrabold text-[22px] tracking-tight drop-shadow-md truncate">
              {discountHeader} {discountSubHeader}
            </span>
          </div>
        ) : (
          <div className="absolute bottom-2 left-3 right-3 flex flex-col pointer-events-none truncate text-ellipsis">
            <span className="text-white font-extrabold text-lg tracking-tight drop-shadow-md truncate">
              {costForTwo}
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="pt-3 px-1">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate w-full">
          {name}
        </h3>
        
        <div className="flex items-center gap-1.5 mt-1">
          <div className={`flex items-center justify-center w-5 h-5 rounded-full ${Number(avgRatingString) >= 4.0 ? 'bg-green-600' : 'bg-orange-500'}`}>
            <Star className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">
            {avgRatingString || 'New'}
          </span>
          <span className="text-slate-600 dark:text-slate-400 font-bold">•</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200 text-[15px]">
            {sla?.slaString}
          </span>
        </div>
        
        <div className="flex flex-col mt-0.5 pointer-events-none text-[15px]">
          <span className="text-slate-500 dark:text-slate-400 truncate w-full">
            {cuisines?.join(', ')}
          </span>
          <span className="text-slate-500 dark:text-slate-400 truncate w-full">
            {areaName}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RestaurantCard);
