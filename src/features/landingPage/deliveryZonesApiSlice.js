import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Set up an entity adapter for normalized state
const deliveryZonesAdapter = createEntityAdapter();

const initialState = deliveryZonesAdapter.getInitialState();

export const deliveryZonesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all delivery zones
    getDeliveryZones: builder.query({
      query: () => "/deliveryzones",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedZones = responseData.map((zone) => {
          zone.id = zone._id; // Normalize `_id` to `id`
          zone.coordinates = {
            lat: zone.coordinates.coordinates[0],
            lng: zone.coordinates.coordinates[1],
          };
          return zone;
        });
        return deliveryZonesAdapter.setAll(initialState, loadedZones);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "DeliveryZone", id: "LIST" },
            ...result.ids.map((id) => ({ type: "DeliveryZone", id })),
          ];
        } else return [{ type: "DeliveryZone", id: "LIST" }];
      },
    }),

    // Create a new delivery zone
    createDeliveryZone: builder.mutation({
      query: (deliveryZoneData) => ({
        url: "/deliveryzones",
        method: "POST",
        body: {
          ...deliveryZoneData,
        },
      }),
      invalidatesTags: [{ type: "DeliveryZone", id: "LIST" }],
    }),

    // Update a delivery zone
    updateDeliveryZone: builder.mutation({
      query: (deliveryZoneData) => ({
        url: `/deliveryzones}`,
        method: "PATCH",
        body: {
          ...deliveryZoneData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "DeliveryZone", id: arg.id },
      ],
    }),

    // Delete a delivery zone
    deleteDeliveryZone: builder.mutation({
      query: ({ id }) => ({
        url: `/deliveryzones`, // Endpoint URL (no ID in the URL)
        method: "DELETE",
        body: { id }, // Send the ID in the request body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "DeliveryZone", id: arg.id },
      ],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDeliveryZonesQuery,
  useCreateDeliveryZoneMutation,
  useUpdateDeliveryZoneMutation,
  useDeleteDeliveryZoneMutation,
} = deliveryZonesApiSlice;

// Memoized selectors for accessing delivery zones data
export const selectDeliveryZonesResult =
  deliveryZonesApiSlice.endpoints.getDeliveryZones.select();

const selectDeliveryZonesData = createSelector(
  selectDeliveryZonesResult,
  (deliveryZonesResult) => deliveryZonesResult.data ?? initialState,
);

export const {
  selectAll: selectAllDeliveryZones,
  selectById: selectDeliveryZoneById,
  selectIds: selectDeliveryZoneIds,
} = deliveryZonesAdapter.getSelectors(
  (state) => selectDeliveryZonesData(state) ?? initialState,
);
