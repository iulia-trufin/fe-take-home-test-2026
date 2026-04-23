"use client";

import React, { HTMLAttributes } from "react";

import { ListingCard } from "./ListingCard";
import { useGetListingsQuery } from "../store/services/listings";

interface ListingsProps extends HTMLAttributes<HTMLUListElement> {}

export const Listings = (props: ListingsProps) => {
  const { data: listings } = useGetListingsQuery();

  if (!listings) {
    return null;
  }

  return (
    <ul
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      {...props}
    >
      {listings.data.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </ul>
  );
};
