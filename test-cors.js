import('node-fetch').then(({default: fetch}) => {
  fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=78036')
    .then(res => res.text())
    .then(text => console.log('Response length:', text.length, 'Data:', text.substring(0, 200)))
    .catch(err => console.error(err));
});
