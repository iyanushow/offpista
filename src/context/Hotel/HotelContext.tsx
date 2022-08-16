import { useContext, createContext, ReactNode, useReducer } from "react";
import { nanoid } from "nanoid";
import { HotelChain, IHotel } from "../../models/interfaces";

type NoIDHotel = Omit<IHotel, "id">;

interface IHotelContext {
  hotels: IHotel[];
  createHotel: (hotel: NoIDHotel) => void;
  editHotel: (id: string, data: Partial<IHotel>) => void;
  deleteHotel: (id: string) => void;
  getHotels: () => void;
  setHotels: (hotels: IHotel[]) => void;
  filterHotel: (chain: HotelChain) => void;
}

const HotelContext = createContext<IHotelContext | null>(null);

const initialState: IHotel[] = JSON.parse(localStorage.getItem("hotels") || "[]");

type ACTIONTYPE =
  | { type: "getHotels" }
  | { type: "setHotels"; payload: IHotel[] }
  | { type: "createHotel"; payload: IHotel }
  | { type: "editHotel"; payload: { id: string; data: Partial<IHotel> } }
  | { type: "deleteHotel"; payload: string }
  | { type: "filterByChain"; payload: HotelChain };

function hotelReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "getHotels":
      return initialState;

    case "setHotels":
      localStorage.setItem("hotels", JSON.stringify(action.payload));

      return action.payload;
    case "createHotel":
      const newHotels = [...state, action.payload];
      localStorage.setItem("hotels", JSON.stringify(newHotels));

      return newHotels;

    case "editHotel":
      const newHotelState = state.map(hotel => {
        if (hotel.id === action.payload.id) {
          return {
            ...hotel,
            ...action.payload.data,
          };
        }

        return hotel;
      });
      localStorage.setItem("hotels", JSON.stringify(newHotelState));
      return newHotelState;
    case "filterByChain":
      const filteredState = initialState.filter(hotel => {
        return hotel.chain_id === action.payload;
      });
      return filteredState;
    case "deleteHotel":
      const updatedHotels = state.filter(hotel => hotel.id === action.payload);
      localStorage.setItem("hotels", JSON.stringify(updatedHotels));
      return updatedHotels;

    default: {
      const _exhaustiveCheck: never = action;
      return _exhaustiveCheck;
    }
  }
}

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(hotelReducer, initialState);

  const getAllHotels = () => {
    dispatch({ type: "getHotels" });
  };

  const setHotels = (hotels: IHotel[]) => {
    dispatch({ type: "setHotels", payload: hotels });
  };
  const createHotel = (hotel: NoIDHotel) => {
    const id = nanoid();
    dispatch({ type: "createHotel", payload: { id, ...hotel } });
  };

  const editHotel = (id: string, data: Partial<IHotel>) => {
    dispatch({ type: "editHotel", payload: { id, data } });
  };

  const deleteHotel = (id: string) => {
    dispatch({ type: "deleteHotel", payload: id });
  };
  const filterHotel = (chain: HotelChain) => {
    dispatch({ type: "filterByChain", payload: chain });
  };

  return (
    <HotelContext.Provider
      value={{
        hotels: state,
        createHotel,
        editHotel,
        deleteHotel,
        getHotels: getAllHotels,
        setHotels,
        filterHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const hotelContext = useContext(HotelContext);

  if (!hotelContext) {
    throw new Error("Missing Provider. You can't use this hook without the provider.");
  }
  return hotelContext;
};
