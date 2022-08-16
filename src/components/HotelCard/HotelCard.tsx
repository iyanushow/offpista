import { useHotel } from "../../context/Hotel/HotelContext";
import { IHotel } from "../../models/interfaces";
import HotelForm from "../Form/Form";

const HotelCard = (props: IHotel) => {
  const { id, name, city, image, price } = props;
  const { deleteHotel } = useHotel();

  return (
    <div className="border border-slate-500 rounded relative">
      <div className="">
        <figure>
          <img src={image} alt={name} className="w-full h-[200px]" />
        </figure>
        <button
          className="absolute py-1 w-20 px-1 bg-red-600 rounded text-white text-xs capitalize cursor-pointer  top-1 right-1"
          onClick={() => deleteHotel(id)}
        >
          Delete
        </button>
        <div className="container p-4">
          <h2 className="font-medium text-lg text-center mt-2 mb-4">{name}</h2>
          <div className="flex justify-between">
            <h3 className="text-base font-medium">Price: ${price}</h3>
            <p>Location: {city}</p>
          </div>
          <div className="flex justify-between">
            <button className="py-1 w-32 mt-4 px-2 bg-[#377aa9] rounded text-white text-base capitalize cursor-pointer">
              Book Now
            </button>

            <HotelForm
              label="Edit Hotel"
              options={{ type: "edit", data: props }}
              labelClass="border border-[#377aa9] text-[#377aa9]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
