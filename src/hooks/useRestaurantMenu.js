import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { RESTAURANT_MENU_API } from '../utils/constants';
import { MOCK_MENU_DATA } from '../mockData/menuData';

const useRestaurantMenu = (resId) => {
  const { lat, lng } = useSelector((state) => state.location);
  const [resInfo, setResInfo] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  const error = null;

  const { data: menuData, isLoading: queryLoading, isError } = useQuery({
    queryKey: ['restaurantMenu', resId, lat, lng],
    queryFn: async () => {
      const response = await fetch(RESTAURANT_MENU_API(lat, lng) + resId);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const text = await response.text();
      if (!text) throw new Error('API returned an empty response.');
      return JSON.parse(text);
    },
    enabled: !!resId, // Only fetch if resId is provided
    staleTime: 5 * 60 * 1000,
  });

  const isLoading = queryLoading && !menuData;

  useEffect(() => {
    if (menuData) {
      // Swiggy sometimes returns HTTP 200 but with empty or error-coded JSON (e.g., statusCode: 1)
      const hasValidData = menuData?.data?.cards?.length > 0;
      
      if (hasValidData) {
        extractMenuData(menuData);
      } else {
        console.warn("API returned 200 OK but payload was empty/invalid. Engaging Fallback Protocol.");
        extractMenuData(MOCK_MENU_DATA);
      }
    } else if (isError) {
      console.warn("Live API Failed for Menu. Engaging Hybrid Fallback Protocol.");
      extractMenuData(MOCK_MENU_DATA);
    }
  }, [menuData, isError]);

    const extractMenuData = (json) => {
      const cards = json?.data?.cards || [];

      // 1. Extract Restaurant Details
      const restaurantCard = cards.find((c) => 
        c?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
      );
      if (restaurantCard) {
        setResInfo(restaurantCard?.card?.card?.info);
      }

      // 2. Extract Menu Item Categories
      const groupedCardContainer = cards.find((c) => c?.groupedCard);
      const allCategories = groupedCardContainer?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      
      // Filter out only the "ItemCategory" cards (Accordions)
      const validCategories = allCategories.filter((c) =>
        c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
      
      setMenuCategories(validCategories);
    };

  return { resInfo, menuCategories, isLoading, error };
};

export default useRestaurantMenu;
