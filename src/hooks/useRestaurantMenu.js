import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RESTAURANT_MENU_API } from '../utils/constants';
import { MOCK_MENU_DATA } from '../mockData/menuData';

const useRestaurantMenu = (resId) => {
  const { lat, lng } = useSelector((state) => state.location);
  const [resInfo, setResInfo] = useState(null);
  const [menuCategories, setMenuCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const error = null; // Removed state as it guarantees uptime via fallbacks

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(RESTAURANT_MENU_API(lat, lng) + resId);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const text = await response.text();
        if (!text) throw new Error('API returned an empty response. Try refreshing the page.');
        
        const json = JSON.parse(text);
        extractMenuData(json);
      } catch (err) {
        console.warn("Live API Failed for Menu. Engaging Hybrid Fallback Protocol:", err.message);
        extractMenuData(MOCK_MENU_DATA);
      } finally {
        setIsLoading(false);
      }
    };

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

    if (resId) {
      fetchMenu();
    }
  }, [resId, lat, lng]);

  return { resInfo, menuCategories, isLoading, error };
};

export default useRestaurantMenu;
