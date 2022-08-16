import React, { ChangeEvent, useEffect, useState } from "react";
import HotelForm from "./components/Form/Form";
import HotelCard from "./components/HotelCard";
import { useHotel } from "./context/Hotel/HotelContext";
import { HotelChain } from "./models/interfaces";

const App = () => {
  const { hotels, setHotels, filterHotel } = useHotel();

  useEffect(() => {
    const fetchHotels = () => {
      const hotels = localStorage.getItem("hotels");

      if (!hotels) return;

      setHotels(JSON.parse(hotels));
    };

    fetchHotels();
  }, []);

  const hotelChains = Object.values(HotelChain);
  const [filterValue, setFilterValue] = useState<HotelChain | null>(null);

  const filterByChains = (e: ChangeEvent<HTMLSelectElement>) => {
    const chain = e.target.value as HotelChain;

    setFilterValue(chain);
    filterHotel(chain);
  };

  return (
    <main className="bg-[#dfdfdf] min-h-screen h-full">
      <div className="max-w-7xl py-20 px-4 mx-auto">
        <div className="container mt-5 my-10">
          <div className="px-8 py-16 bg-[#e9ecef]">
            <div className="container text-center">
              <h1 className="text-4xl font-bold">Welcome to Hotel Rankings</h1>
              <p className="text-xl my-2">Your path to elegant relaxation</p>

              <HotelForm label="Add new hotel" options={{ type: "create" }} />
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className={"relative w-full flex flex-col "}>
            <select
              name="chain_id"
              id="chain_id"
              className="border h-10 rounded w-[400px] px-5 capitalize"
              onChange={filterByChains}
              value={(filterValue as HotelChain) || ""}
            >
              <option value="#">Select a Hotel Chain</option>
              {hotelChains.map(chain => (
                <option value={chain} key={chain}>
                  {chain}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-2.5 w-full container">
          {hotels &&
            hotels?.map(hotel => (
              <div className="col-span-2" key={hotel.id}>
                <HotelCard key={hotel.id} {...hotel} />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default App;
