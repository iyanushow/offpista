import React, { useState, ReactElement, useRef, ChangeEvent, ReactFragment } from "react";
import Modal from "../Modal";
import { useHotel } from "../../context/Hotel/HotelContext";
import { HotelChain, IHotel } from "../../models/interfaces";

export interface IFormValues {
  name: string;
  price: string | number;
  city: string;
  country: string;
  address: string;
  chain_id: HotelChain | null;
  image: string;
}

interface IForm {
  label: string;
  labelClass?: string;
  options: { type: "create" } | { type: "edit"; data: IHotel };
}

const HotelForm = ({ label, labelClass = " bg-[#377aa9] text-white", options }: IForm) => {
  const { createHotel, editHotel } = useHotel();

  let initialValues: IFormValues;

  if (options.type === "edit") {
    const { id, ...editData } = options.data;

    initialValues = editData;
  } else {
    initialValues = {
      name: "",
      price: 0,
      city: "",
      country: "",
      address: "",
      image: "",
      chain_id: null,
    };
  }

  const [values, setValues] = useState<IFormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValues({ ...values, chain_id: e.target.value as HotelChain });
  };

  const clearForm = () => {
    setValues(initialValues);
  };

  const formModal = useRef<{ handleClick(): void }>(null!);

  const handleClick = () => formModal.current.handleClick();

  const hotelChains = Object.values(HotelChain);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (options.type === "create") {
      createHotel(values);
    } else {
      editHotel(options.data.id, values);
    }

    handleClick();
    clearForm();
  };

  return (
    <Modal
      ref={formModal}
      className="bg-white px-2 relative ease-out duration-500"
      rowClassName="h-6 pb-0 pt-2"
      modalTrigger={
        <button
          onClick={handleClick}
          className={
            "py-1 w-32 mt-4 px-2  rounded  text-base capitalize cursor-pointer " + labelClass
          }
        >
          {label}
        </button>
      }
    >
      <form className="px-8 py-5 " onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center mb-5">Fill the details of the hotel</h1>

        <div className={"grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 mb-2"}>
          <div className={"relative w-full flex flex-col"}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required
              id="name"
              name="name"
              placeholder="Enter name of Hotel "
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.name}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="price">Price ($ per night) </label>
            <input
              type="number"
              required
              id="price"
              name="price"
              placeholder="Enter the price of the hotel per night"
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.price}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="address">Address</label>
            <input
              required
              id="address"
              name="address"
              placeholder="Enter the full address of the hotel"
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.address}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="city">City</label>
            <input
              required
              id="city"
              name="city"
              placeholder="What city is it located?"
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.city}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="country">Country</label>
            <input
              required
              id="country"
              name="country"
              placeholder="What country is it located?"
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.country}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="image">Image url</label>
            <input
              type="url"
              required
              id="image"
              name="image"
              placeholder="Enter a url for the image"
              className="border h-10 rounded w-[400px] pl-4"
              onChange={handleChange}
              value={values.image}
            />
          </div>

          <div className={"relative w-full flex flex-col "}>
            <label htmlFor="chain_id">Hotel Chain</label>
            <select
              name="chain_id"
              id="chain_id"
              className="border h-10 rounded w-[400px] px-4 capitalize"
              onChange={handleSelectChange}
              value={(values.chain_id as HotelChain) || ""}
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

        <div>
          <button
            type="submit"
            className="w-40 py-1.5 mt-5 px-2 bg-[#377aa9] rounded text-white text-base capitalize
            "
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default HotelForm;
