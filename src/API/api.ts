import axios from "axios";
import { Venue } from "../types";

const getVenues = async (): Promise<Venue[]> => {
  try {
    const API_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001/venues" // Local proxy server
        : "https://api.hoaxcoffee.com/venues"; // Production API

    const response = await axios.get<Venue[]>(API_URL, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY as string,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};

export default getVenues;
