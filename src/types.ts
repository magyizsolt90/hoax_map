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
  type: string;
  interiorImage: string;
  exteriorImage: string;
  beansForSale: string[];
  beansInTheGrinder: string[];
}
export interface StoreContextType {
  venues: Venue[];
}
