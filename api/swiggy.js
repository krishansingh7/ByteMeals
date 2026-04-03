module.exports = async function handler(req, res) {
  const url = new URL(req.url, "http://localhost");
  const swiggyPath = url.pathname.replace("/api/swiggy", "") + url.search;
  const swiggyUrl = `https://www.swiggy.com${swiggyPath}`;

  const fetchHeaders = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-IN,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Origin: "https://www.swiggy.com",
    Referer: "https://www.swiggy.com/",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    "sec-ch-ua": '"Not/A)Brand";v="99", "Google Chrome";v="126"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
  };

  try {
    let response = await fetch(swiggyUrl, {
      headers: fetchHeaders,
    });

    if (!response.ok && response.status !== 403) {
      return res.status(response.status).json({
        error: `Swiggy returned ${response.status}`,
      });
    }

    let text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // Swiggy blocked the Vercel IP with Cloudflare HTML or empty response.
      // Emergency Fallback: Route request recursively through a free proxy network!
      const fallbackUrl = `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;
      const fallbackResponse = await fetch(fallbackUrl, { headers: fetchHeaders });
      const fallbackText = await fallbackResponse.text();
      
      try {
        data = JSON.parse(fallbackText);
      } catch (err) {
        return res.status(502).json({
          error: "Swiggy WAF blocked Both Vercel and Fallback Proxies. Try MAPI.",
          details: fallbackText.substring(0, 200),
        });
      }
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Swiggy proxy", message: error.message });
  }
};