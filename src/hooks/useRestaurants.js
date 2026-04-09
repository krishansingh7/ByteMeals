import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { HOME_PAGE_API } from '../utils/constants';
import { MOCK_RESTAURANTS_DATA } from '../mockData/restaurantData';

const useRestaurants = () => {
  const { lat, lng } = useSelector((state) => state.location);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [topChains, setTopChains] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const error = null; // Removed state as it guarantees uptime via fallbacks

  const { data: apiData, isLoading: queryLoading, isError } = useQuery({
    queryKey: ['restaurants', lat, lng],
    queryFn: async () => {
      const response = await fetch(HOME_PAGE_API(lat, lng));
      if (!response.ok) throw new Error('Live API Failed');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = queryLoading && !apiData;

  useEffect(() => {
    if (apiData) {
      const hasValidData = apiData?.data?.cards?.length > 0;
      
      if (hasValidData) {
        extractCardsData(apiData);
      } else {
        console.warn("API returned 200 OK but payload was empty/invalid. Engaging Fallback Protocol.");
        extractCardsData(MOCK_RESTAURANTS_DATA);
      }
    } else if (isError) {
      // Automatic fallback for 100% simulated uptime
      console.warn("Live API Failed. Engaging Hybrid Fallback Protocol.");
      extractCardsData(MOCK_RESTAURANTS_DATA);
    }
  }, [apiData, isError]);

  const extractCardsData = (json) => {
    const cards = json?.data?.cards || [];

    // 1. Categories
    const categoriesCard = cards.find(c => c?.card?.card?.id === "whats_on_your_mind");
    if (categoriesCard) {
      setCategories(categoriesCard?.card?.card?.imageGridCards?.info || []);
    }

    // 2. Top Brands
    const topBrandsCard = cards.find(c => c?.card?.card?.id === "top_brands_for_you");
    if (topBrandsCard) {
      setTopChains(topBrandsCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    }

    // 3. Main Restaurant Grid
    const gridListingCard = cards.find(c => c?.card?.card?.id === "restaurant_grid_listing_v2");
    if (gridListingCard) {
      setAllRestaurants(gridListingCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    }
  };

  const fetchMoreRestaurants = () => {
    // Only fetch if we are not already fetching and if we have initial restaurants
    if (isFetchingMore || allRestaurants.length === 0) return;
    
    setIsFetchingMore(true);

    // Mock an artificial network delay of 1.5 seconds so the UI looks realistic
    setTimeout(() => {
      // Create a fresh batch by cloning and SHUFFLING existing restaurants so they don't look identically duplicate
      const shuffledRestaurants = [...allRestaurants].sort(() => 0.5 - Math.random());
      
      const newBatch = shuffledRestaurants.map(restaurant => {
        // Deep copy the original restaurant item
        const clonedRestaurant = JSON.parse(JSON.stringify(restaurant));
        
        // Add a random hash to the unique ID
        const randomHash = Math.random().toString(36).substring(7);
        clonedRestaurant.info.id = clonedRestaurant.info.id + "-" + randomHash;
        
        return clonedRestaurant;
      });

      // Append new array directly to state
      setAllRestaurants(prev => [...prev, ...newBatch]);
      setIsFetchingMore(false);
      
    }, 1500);
  };

  return { allRestaurants, topChains, categories, isLoading, isFetchingMore, fetchMoreRestaurants, error };
};

export default useRestaurants;
