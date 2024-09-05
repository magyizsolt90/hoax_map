import { StoreContextType, Venue } from "../types";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import getVenues from "../API/api";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const Store = ({ children }: { children: ReactNode }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const data = await getVenues();
        setVenues(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch venues.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return (
    <StoreContext.Provider
      value={{ venues, selectedVenue, setSelectedVenue, loading, error }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a Store provider");
  }
  return context;
};
