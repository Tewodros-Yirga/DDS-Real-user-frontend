import { apiSlice } from "../../app/api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all orders
    getAllOrders: builder.query({
      query: ({ status, customer, pilot, page = 1, limit = 10 }) => {
        const queryParams = new URLSearchParams({
          status,
          customer,
          pilot,
          page,
          limit,
        }).toString();
        return `/orders?${queryParams}`;
      },
      providesTags: (result, error, arg) =>
        result?.docs
          ? [
              ...result.docs.map(({ _id }) => ({ type: "Order", id: _id })),
              "Order",
            ]
          : ["Order"],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    // Reschedule an order
    rescheduleOrder: builder.mutation({
      query: ({ id, rescheduledDate }) => ({
        url: `/orders/reschedule/${id}`,
        method: "PATCH",
        body: { rescheduledDate },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    // Cancel an order
    cancelOrder: builder.mutation({
      query: ({ id, reason, userId }) => ({
        url: `/orders/cancel/${id}`,
        method: "PATCH",
        body: { reason, userId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    // Complete an order
    completeOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/complete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useRescheduleOrderMutation,
  useCancelOrderMutation,
  useCompleteOrderMutation,
} = ordersApiSlice;
