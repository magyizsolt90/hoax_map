const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

app.use(cors());

app.get("/mapbox", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/styles/v1/mapbox/dark-v10`,
      {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_TOKEN,
        },
      }
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Mapbox data:", error.message);
    res.status(500).send("Error fetching data from Mapbox API");
  }
});

app.get("/venues", async (req, res) => {
  try {
    const response = await axios.get(`https://api.hoaxcoffee.com/venues`, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY, // Használja a környezeti változóból betöltött API kulcsot
      },
      params: req.query, // Továbbítja a query paramétereket, ha vannak
    });
    res.setHeader("Access-Control-Allow-Origin", "*"); // Fejléc beállítása a válaszban
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).send("Error fetching data from API");
  }
});
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
