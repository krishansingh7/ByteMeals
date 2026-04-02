module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const swiggyPath = url.pathname.replace("/api/swiggy", "") + url.search;
  const swiggyUrl = `https://www.swiggy.com${swiggyPath}`;

  try {
    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        Origin: "https://www.swiggy.com",
        Referer: "https://www.swiggy.com/",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Swiggy" });
  }
};
