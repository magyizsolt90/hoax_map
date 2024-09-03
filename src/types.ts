export interface Venue {
  id: number;
  name: string;
  lat: number;
  lon: number;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  openingHours: Record<string, { from: string; to: string } | null>;
  coffeeTypes: string[];
  features: string[];
  type: CafeType;
  interiorImage: string;
  exteriorImage: string;
  beansForSale: string[];
  beansInTheGrinder: string[];
}
export interface StoreContextType {
  venues: Venue[];
  selectedVenue: Venue | null;
  setSelectedVenue: (venue: Venue | null) => void;
  loading: boolean;
  error: any;
}

export interface OpeningHours {
  from: string;
  to: string;
}

export interface WeeklyOpeningHours {
  [key: string]: OpeningHours | null;
}

export interface ImageProps {
  className?: string;
  src: string;
  alt: string;
}

export interface ListItemProps {
  venueId: number;
  map?: boolean;
}

export enum CafeType {
  CAFE = 'CAFE',
  RESTAURANT = 'RESTAURANT',
  BAR = 'BAR',
  TRUCK = 'TRUCK',
  DELICATES = 'DELICATES',
  SHOP = 'SHOP',
  STUDIO = 'STUDIO',
  BISTRO = 'BISTRO',
  PASTRY_SHOP = 'PASTRY_SHOP',
  BAKERY = 'BAKERY',
  GUESTHOUSE = 'GUESTHOUSE',
  COMMUNITY_VENUE = 'COMMUNITY_VENUE',
}