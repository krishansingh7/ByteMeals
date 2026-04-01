import('node-fetch').then(async ({default: fetch}) => {
  try {
    const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=376244'));
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Length:", text.length, "Result:", text.substring(0, 100));
  } catch (e) {
    console.error(e);
  }
});
