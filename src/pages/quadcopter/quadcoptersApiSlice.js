import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const quadcoptersAdapter = createEntityAdapter({});

const initialState = quadcoptersAdapter.getInitialState();

export const quadcoptersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuadcopters: builder.query({
      query: () => "/quadcopters",

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Quadcopter", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Quadcopter", id })),
          ];
        } else return [{ type: "Quadcopter", id: "LIST" }];
      },
      transformResponse: (responseData) => {
        const loadedQuadcopters = responseData.map((quadcopter) => {
          quadcopter.id = quadcopter._id;
          return quadcopter;
        });
        return quadcoptersAdapter.setAll(initialState, loadedQuadcopters);
      },
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to fetch quadcopters";
      },
    }),

    addQuadcopter: builder.mutation({
      query: (initialQuadcopterData) => ({
        url: "/quadcopters",
        method: "POST",
        body: {
          ...initialQuadcopterData,
        },
      }),
      invalidatesTags: [{ type: "Quadcopter", id: "LIST" }],
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to add quadcopter";
      },
    }),
    updateQuadcopter: builder.mutation({
      query: (initialQuadcopterData) => ({
        url: "/quadcopters",
        method: "PATCH",
        body: {
          ...initialQuadcopterData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quadcopter", id: arg.id },
      ],
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to update quadcopter";
      },
    }),
    deleteQuadcopter: builder.mutation({
      query: (id) => ({
        url: `/quadcopters`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Quadcopter", id: arg.id },
      ],
      transformErrorResponse: (response) => {
        return response.data?.message || "Failed to delete quadcopter";
      },
    }),
  }),
});

export const {
  useGetQuadcoptersQuery,
  useAddQuadcopterMutation,
  useUpdateQuadcopterMutation,
  useDeleteQuadcopterMutation,
} = quadcoptersApiSlice;
// returns the query result object
export const selectQuadcoptersResult =
  quadcoptersApiSlice.endpoints.getQuadcopters.select();

// creates memoized selector
const selectQuadcoptersData = createSelector(
  selectQuadcoptersResult,
  (quadcoptersResult) => quadcoptersResult.data, // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuadcopters,
  selectById: selectQuadcopterById,
  selectIds: selectQuadcopterIds, // Pass in a selector that returns the quadcopters slice of state
} = quadcoptersAdapter.getSelectors(
  (state) => selectQuadcoptersData(state) ?? initialState,
);
