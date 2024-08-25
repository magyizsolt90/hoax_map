import axios from "axios";

const API_URL = "https://api.hoaxcoffee.com/venues";

const getVenues = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
      params: {
        coffeeBeans: ["ESPRESSO"],
        coffeeTypes: ["LATTE"],
        features: ["WIFI"],
        isOpen: ["TODAY"],
      },
    });
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error fetching venues:", error);
  }
};

export default getVenues;
