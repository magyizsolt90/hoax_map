import axios from "axios";
import { Venue } from "../types";

const API_URL = "https://api.hoaxcoffee.com/venues";

const getVenues = async (): Promise<Venue[]> => {
  try {
    if (process.env.NODE_ENV === "development") {
      const venues = require("./venues.json");
      return venues;
    } else {
      const response = await axios.get<Venue[]>(API_URL, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY as string,
        },
        params: {
          coffeeBeans: ["ESPRESSO"],
          coffeeTypes: ["LATTE"],
          features: ["WIFI"],
          isOpen: ["TODAY"],
        },
      });
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};

export default getVenues;
