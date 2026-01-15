import { apiSlice } from './apiSlice';
const ORDERS_URL = '/api/orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/payment/intent`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, useCreatePaymentIntentMutation } = ordersApiSlice;
