import React, { useEffect, useRef } from 'react';
import useRestaurants from '../hooks/useRestaurants';
import RestaurantCard from '../components/RestaurantCard';
import CategoryCarousel from '../components/CategoryCarousel';
import { ShimmerCard, ShimmerCategory } from '../components/Shimmer';
import { useSelector } from 'react-redux';

const Home = () => {
  const { allRestaurants, topChains, categories, isLoading, error, isFetchingMore, fetchMoreRestaurants } = useRestaurants();
   const { city, address } = useSelector((state) => state.location);
  const observerRef = useRef();
  

  useEffect(() => {
    if (isLoading || !observerRef.current) return;

    // We create an observer that watches the bottom anchor
    const observer = new IntersectionObserver((entries) => {
      // If the anchor enters the viewport, trigger our mock API fetch
      if (entries[0].isIntersecting) {
        fetchMoreRestaurants();
      }
    }, { threshold: 0.1 });

    const target = observerRef.current;
    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [isLoading, fetchMoreRestaurants]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Something went wrong</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-md">{error}</p>
        <p className="mt-4 text-sm text-slate-500">
          Swiggy APIs have strict CORS and Geo-blocking. Please ensure the proxy is running and you are not being blocked.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 min-h-screen">
      {/* Categories Section */}
      {isLoading ? (
        <div className="mt-4">
          <ShimmerCategory />
        </div>
      ) : (
        <CategoryCarousel categories={categories} />
      )}

      {/* Top Chains Section */}
      {topChains && topChains.length > 0 && !isLoading && (
        <div className="mb-10 pb-10 border-b border-gray-200 dark:border-slate-800">
          <h2 className="text-[22px] sm:text-2xl font-bold text-[#02060C] dark:text-gray-100 mb-6 px-2">
            Top restaurant chains in {city}
          </h2>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {topChains.map((restaurant) => (
              <div
                key={restaurant.info.id}
                className="min-w-[280px] sm:min-w-[300px]"
              >
                <RestaurantCard resData={restaurant} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid Section */}
      <h2 className="text-[22px] sm:text-2xl font-bold text-[#02060C] dark:text-gray-100 mb-6 px-2">
        Restaurants with online food delivery
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2">
        {isLoading
          ? [...Array(12)].map((_, i) => <ShimmerCard key={i} />)
          : allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
            ))}
      </div>

      {/* Invisible anchor for Infinite Scroll */}
      <div ref={observerRef} className="h-10 w-full mt-4" />

      {/* Loading Indicator for Infinite Scroll */}
      {isFetchingMore && (
        <div className="w-full py-8 flex justify-center">
          <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-slate-300 border-t-[#fc8019] rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
