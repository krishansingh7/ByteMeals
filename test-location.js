import('node-fetch').then(async ({default: fetch}) => {
  try {
    const res = await fetch('https://www.swiggy.com/dapi/misc/place-autocomplete?input=pune&types=', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    console.log("Autocomplete Status:", res.status);
    const text = await res.text();
    console.log("Autocomplete Response:", text.substring(0, 300));
  } catch(e) { console.error(e); }
});
