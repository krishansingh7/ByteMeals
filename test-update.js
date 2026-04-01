import('node-fetch').then(async ({default: fetch}) => {
  try {
    const payload = {
      lat: "19.0759837",
      lng: "72.8776559",
      nextOffset: "CJhlELQ4KIC49qbr05rdcjCnEw==",
      widgetOffset: {
        "NewListingView_category_bar_chicletranking_TwoRows": "",
        "NewListingView_category_bar_chicletranking_TwoRows_Rendition": "",
        "Restaurant_Group_WebView_SEO_PB_Theme": "",
        "collectionV5RestaurantListWidget_SimRestoRelevance_food_seo": "9",
        "inlineFacetFilter": "",
        "restaurantCountWidget": ""
      },
      filters: {},
      seoParams: {
        seoUrl: "https://www.swiggy.com/",
        pageType: "FOOD_HOMEPAGE",
        apiName: "FoodHomePage"
      },
      page_type: "DESKTOP_WEB_LISTING",
      _csrf: "1" // sometimes required
    };
    const res = await fetch("https://www.swiggy.com/dapi/restaurants/list/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      body: JSON.stringify(payload)
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text.substring(0, 300));
  } catch(e) { console.error(e); }
});
