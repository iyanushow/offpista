export enum HotelChain {
  Strenger = "strenger",
  Marvel = "marvel",
  Avatar = "avatar",
  Premier = "premier",
}

export interface IHotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  chain_id: HotelChain | null;
  image: string;
  price: number | string;
}
