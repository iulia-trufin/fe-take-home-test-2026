"use client";

import React, { HTMLAttributes } from "react";
import { Listing, ListingsVariant } from "../types";
import {
  useFavoriteListingMutation,
  useUnfavoriteListingMutation,
  useGetFavoritesQuery,
} from "../store/services/favorites";
import { useToast } from "../hooks/useToast";

interface ListingProps extends HTMLAttributes<HTMLLIElement> {
  listing: Listing;
  variant?: ListingsVariant;
}

export const ListingCard = ({
  listing,
  variant = "favorites",
}: ListingProps) => {
  const [favoriteListing, { isLoading: isAdding }] =
    useFavoriteListingMutation();
  const [unfavoriteListing, { isLoading: isRemoving }] =
    useUnfavoriteListingMutation();
  const { data } = useGetFavoritesQuery();
  const { showToast } = useToast();

  const isMutating = isAdding || isRemoving;
  const favorites = data?.data ?? [];
  const isFavorited = favorites.some((fav) => fav.id === listing.id);

  const handleAddToFavorites = async () => {
    try {
      await favoriteListing(listing).unwrap();
      showToast("Added to favorites");
    } catch (error) {
      console.error("Failed to add favorite", error);
      showToast("Something went wrong. Please refresh and try again");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await unfavoriteListing(listing.id).unwrap();
      showToast("Removed from favorites");
    } catch (error) {
      console.error("Failed to remove favorite", error);
      showToast("Something went wrong. Please refresh and try again");
    }
  };

  return (
    <li
      className={`group relative flex flex-col rounded-xl border p-[1px] transition hover:scale-[1.01] ${
        variant === "listings"
          ? isFavorited
            ? "border-yellow-400/60 shadow-[0_0_10px_rgba(250,204,21,0.4)]"
            : "border-white/10"
          : "border-white/10"
      }`}
    >
      <div className="flex flex-col gap-3 p-5 grow">
        <p className="text-lg font-semibold flex items-center gap-2">
          {variant === "listings" && isFavorited && (
            <span className="text-yellow-400">⭐</span>
          )}
          {listing.car}
        </p>
        <p className="text-sm text-neutral-400">{listing.name}</p>
        <p>
          <a href={`tel:${listing.phone}`} className="text-sm">
            {listing.phone}
          </a>
        </p>
        <button
          disabled={isMutating}
          onClick={
            isFavorited ? handleRemoveFromFavorites : handleAddToFavorites
          }
          className={`mt-auto rounded-lg px-4 py-2 text-sm font-medium text-white transition active:scale-[0.98] ${
            isMutating
              ? "opacity-50 cursor-not-allowed"
              : isFavorited
                ? "bg-red-600 hover:bg-red-500"
                : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isMutating
            ? "Working..."
            : isFavorited
              ? "Remove from favorites"
              : "Add to favorites"}
        </button>
      </div>
    </li>
  );
};
