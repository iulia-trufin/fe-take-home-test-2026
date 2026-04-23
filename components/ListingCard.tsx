import React, { HTMLAttributes } from "react";

import { Listing } from "../types";

interface ListingProps extends HTMLAttributes<HTMLLIElement> {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingProps) => {
  const handleAddToFavorites = () => {
    // Task 1
  };

  const handleRemoveFromFavorites = () => {
    // Task 1
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
          onClick={handleAddToFavorites}
          className="mt-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 active:scale-[0.98]"
        >
          Add to favorites 🌟
        </button>
      </div>
    </li>
  );
};
