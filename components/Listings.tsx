"use client";

import React, { HTMLAttributes } from "react";

import { ListingCard } from "./ListingCard";
import { useGetListingsQuery } from "../store/services/listings";
import { Listing, ListingsVariant } from "../types";

interface ListingsProps extends HTMLAttributes<HTMLUListElement> {
  data: Listing[];
  variant?: ListingsVariant;
}

export const Listings = ({ data, variant, ...props }: ListingsProps) => {
  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      {...props}
    >
      {data.map((listing) => (
        <ListingCard key={listing.id} listing={listing} variant={variant} />
      ))}
    </ul>
  );
};
