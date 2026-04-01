const fetch = require('node-fetch');
fetch('http://localhost:5173/api/swiggy/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=78036')
  .then(res => res.text())
  .then(text => console.log('Response:', text.substring(0, 500)))
  .catch(err => console.error(err));
