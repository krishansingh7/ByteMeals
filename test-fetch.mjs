const url = 'https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=78036';
fetch(url)
  .then(r => r.text())
  .then(t => console.log('Response length:', t.length, 'Snippet:', t.substring(0,200)))
  .catch(console.error);
