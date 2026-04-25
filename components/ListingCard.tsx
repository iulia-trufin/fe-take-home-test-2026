import React, { HTMLAttributes } from "react";

import { Listing } from "../types";
import {
  useFavoriteListingMutation,
  useUnfavoriteListingMutation,
  useGetFavoritesQuery,
} from "../store/services/favorites";

interface ListingProps extends HTMLAttributes<HTMLLIElement> {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingProps) => {
  const [favoriteListing] = useFavoriteListingMutation();
  const [unfavoriteListing] = useUnfavoriteListingMutation();
  const { data } = useGetFavoritesQuery();

  const favorites = data?.data ?? [];

  const isFavorited = favorites.some((fav) => fav.id === listing.id);

  const handleAddToFavorites = async () => {
    try {
      await favoriteListing(listing).unwrap();
    } catch (error) {
      console.error("Failed to add favorite", error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await unfavoriteListing(listing.id).unwrap();
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  return (
    <li className="group relative flex flex-col rounded-xl border border-white/10 bg-white/5 p-[1px] transition hover:scale-[1.01]">
      <div className="flex flex-col gap-3 p-5 grow">
        <p className="text-lg font-semibold">{listing.car}</p>
        <p className="text-sm text-neutral-400">{listing.name}</p>
        <p>
          <a href={`tel:${listing.phone}`} className="text-sm">
            {listing.phone}
          </a>
        </p>
        <button
          onClick={
            isFavorited ? handleRemoveFromFavorites : handleAddToFavorites
          }
          className={`mt-auto rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-[0.98] ${
            isFavorited
              ? "bg-red-600 hover:bg-red-500"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isFavorited ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </li>
  );
};
