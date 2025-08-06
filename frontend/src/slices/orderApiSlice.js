import { apiSlice } from "./apiSlice";
import { BACKEND_URL, ORDERS_URL } from "../constants";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      // order data (cartItems, paymentMethod,temsPrice,shippingPrice,taxPrice,totalPrice,) as an parameters it will put it in body and send a post request to the backend
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      // It takes order id as parametere and redirects to order details
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/user-orders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    payWithStripe: builder.mutation({
      // It takes order items as parametere and put it in a body and send to the backend as a post request
      query: (orderItems) => ({
        url: `${BACKEND_URL}/create-checkout-session`,
        method: "POST",
        body: orderItems,
      }),
    }),
    deliverOrder: builder.mutation({
      //Takes the order ID as parameres and sends a patch request to the backend
      query: (orderId) => ({
        url: `${ORDERS_URL}/deliver/${orderId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetUserOrdersQuery,
  usePayWithStripeMutation,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = orderApiSlice;
