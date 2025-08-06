import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../slices/cartSlice";

export default function ShippingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useSelector lets extract data from your global Redux store
  // select the cart state from the redux store
  const cart = useSelector((state) => state.cart);
  // extract the shippingAddress from the cart state
  const { shippingAddress } = cart;
  // If the cart state has shippingAddress present then it will update the state with it else it will set the address form the user input
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  // handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches the data{ address, city, postalCode, country } to the saveShippingAddress cart slice to the redux to update and store in local storage
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md ">
      <h3 className="text-3xl font-semibold mb-4">Shipping</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="address" className="text-gray-700">
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="text-gray-700">
            City:
          </label>
          <input
            type="text"
            id="city"
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="text-gray-700">
            Postal Code:
          </label>
          <input
            type="text"
            id="postalCode"
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="text-gray-700">
            Country:
          </label>
          <input
            type="text"
            id="country"
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-6000"
          onClick={handleSubmit}
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}
