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

  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getVenues();
      setVenues(data);
    };

    fetchVenues();
  }, []);

  return (
    <StoreContext.Provider value={{ venues, selectedVenue, setSelectedVenue }}>
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
