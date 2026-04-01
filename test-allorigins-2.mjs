const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=376244');
fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  .then(res => res.text())
  .then(text => console.log("allorigins length:", text.length, "Snippet:", text.substring(0, 100)))
  .catch(console.error);
