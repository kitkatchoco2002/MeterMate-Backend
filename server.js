const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

async function scrapeRates() {
  try {
    const response = await axios.get("https://boheco1.com/index.php/power-rates/");
    const $ = cheerio.load(response.data);

    // This part depends on BOHECO's HTML structure — example below:
    const onGridRate = parseFloat($("table")
      .eq(0)
      .find("tr")
      .eq(1)
      .find("td")
      .eq(1)
      .text()
      .trim()) || 0;

    const offGridRate = parseFloat($("table")
      .eq(0)
      .find("tr")
      .eq(2)
      .find("td")
      .eq(1)
      .text()
      .trim()) || 0;

    const fixedCharge = 5.6; // Hardcoded unless we can scrape this too

    return {
      onGridRate,
      offGridRate,
      fixedCharge,
      lastUpdated: new Date().toISOString().split("T")[0]
    };
  } catch (err) {
    console.error("Error scraping rates:", err);
    return null;
  }
}

app.get("/rates", async (req, res) => {
  const rates = await scrapeRates();
  if (rates) {
    res.json(rates);
  } else {
    res.status(500).json({ error: "Unable to fetch rates" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
