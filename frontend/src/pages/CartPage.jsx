import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../slices/cartSlice";

export default function CartPage() {
  // useSelector is used to access the Redux store state
  const { cartItems, taxPrice, shippingPrice, totalPrice, itemsPrice } =
    useSelector((state) => state.cart);

  // useDispatch is used to dispatch actions to the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate the total number of items in the cart
  // The reduce method iterates over each item in the cartItems array and accumulates the total quantity (qty) of items.
  const totalItems = cartItems.reduce((acc, item) => acc + +item.qty, 0);

  // Function to handle the deletion of an item from the cart
  // It takes the item's id as an argument and dispatches the removeFromCart action with that id.
  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Function to handle the checkout process
  // If the user is not logged in then will redirect to login page else shipping page
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start">
      <div className="md:w-2/3 p-4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
        {/* If the cartItems is not empty it map the items */}
        {cartItems.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div
                className="border border-gray-300 p-4 flex items-center"
                key={item._id}
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.qty}</p>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xl">Your Cart is empty.</p>
        )}
      </div>

      {cartItems.length !== 0 && (
        <div className="md:w-1/3 bg-gray-100 p-4">
          <h2 className="text-xl font-semibold">Subtotal</h2>
          <p className="text-gray-600">Total Items: {totalItems} </p>
          <p className="text-gray-600">Items Price: {itemsPrice} </p>
          <p className="text-gray-600">Tax: ${taxPrice} </p>
          <p className="text-gray-600">ShippingPrice: ${shippingPrice} </p>
          <p className="text-gray-600">Total Price: ${totalPrice} </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
            onClick={checkoutHandler}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
