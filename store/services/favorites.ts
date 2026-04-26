// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Listing, ListingsResponse } from "../../types";

export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavorites: builder.query<ListingsResponse, void>({
      query: () => "favorites",
      providesTags: ["Favorites"],
    }),
    favoriteListing: builder.mutation<ListingsResponse, Listing>({
      query: (listing) => ({
        url: `favorites`,
        method: "POST",
        body: listing,
      }),
      async onQueryStarted(listing, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoritesApi.util.updateQueryData(
            "getFavorites",
            undefined,
            (draft) => {
              const alreadyFavorited = draft.data.some(
                (item) => item.id === listing.id,
              );
              if (!alreadyFavorited) {
                draft.data.push(listing);
              }
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Favorites"],
    }),
    unfavoriteListing: builder.mutation<ListingsResponse, string>({
      query: (id) => ({
        url: `favorites/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          favoritesApi.util.updateQueryData(
            "getFavorites",
            undefined,
            (draft) => {
              draft.data = draft.data.filter((item) => item.id !== id);
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useFavoriteListingMutation,
  useUnfavoriteListingMutation,
} = favoritesApi;
