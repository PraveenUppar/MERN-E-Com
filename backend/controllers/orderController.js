import Order from "../models/order.model.js";
import asyncHandler from "express-async-handler";

// ************** User order logic *****************

// To calculate the total price of the order
const addOrderItems = asyncHandler(async (req, res) => {
  //  Destructure the items from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  // Check if the order quantity is not zero it should be one in order to calculate the price
  if (orderItems?.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    // Creating a New Mongoose Document
    const order = new Order({
      user: req.user._id,
      // Orderitmes contains = [name,quantity,image,price,product type etc] in the orderitems model in the database
      // For each item, it creates a new object. The spread operator (...item) copies all existing properties of the item.
      // orderItems: [{name: "iPhone 13",qty: 1,price: 999,product: "60c72b2f9b1d8e4c7a8b4567"}],
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // writes the new order document to the MongoDB database.
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// Fetch all the order of the user from th database
// a previous authentication middleware (like the protect middleware) has already run.
// order will be populated with user details (user._id) with user name also
// Find all orders in the Order collection where the user field is equal to the ID of the logged-in user.
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("user");
  res.json(orders);
});

// This function fetches a specific order based on the provided ID in the request parameters and sends it as a JSON response
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// ************** Admin order logic *****************

//
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "id name");
  res.send(orders);
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  }
  res.status(404);
  throw new Error("Order Not Found");
});

export {
  addOrderItems,
  getOrderById,
  getUserOrders,
  getOrders,
  updateOrderToDelivered,
};
