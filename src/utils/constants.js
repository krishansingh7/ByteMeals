/**
 * Centralized API Endpoints and Configuration Constants.
 * Edit these values if Swiggy's internal API changes.
 */

// We proxy requests starting with /api/swiggy to https://www.swiggy.com/dapi
// This is configured in vite.config.js to bypass CORS.

export const HOME_PAGE_API = (lat = "28.6139391", lng = "77.2090212") =>
  `/api/swiggy/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

export const RESTAURANT_MENU_API = (lat = "28.6139391", lng = "77.2090212") =>
  `/api/swiggy/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=`;

// --- Cloudinary Image CDNs ---
export const BASE_IMG_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const MENU_IMG_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
