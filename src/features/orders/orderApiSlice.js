// features/orders/orderApiSlice.js
import { apiSlice } from "../../app/api/apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Order"],
    }),

    rescheduleOrder: builder.mutation({
      query: ({ id, rescheduledDate }) => ({
        url: `/orders/${id}/reschedule`,
        method: "PATCH",
        body: { rescheduledDate },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    cancelOrder: builder.mutation({
      query: ({ id, reason, userId }) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        body: { reason, userId },
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
} = orderApiSlice;
