export interface Listing {
  id: string;
  name: string;
  phone: string;
  title: string;
  car: string;
}

export interface APIError {
  status: number;
  message: string;
}

export interface ListingsResponse {
  data: Listing[];
}

export type ListingsVariant = "listings" | "favorites";
