"use client";

import Link from "next/link";

import { Listings } from "../../components/Listings";
import { useGetFavoritesQuery } from "../../store/services/favorites";
import { Toast } from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

export default function FavoritesPage() {
  const { data, isLoading } = useGetFavoritesQuery();
  const { message } = useToast();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40 text-neutral-400 text-sm">
        Warming up the engines...
      </div>
    );
  }
  return (
    <main className="flex flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-white transition"
        >
          &lt; Back to home page
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">Favorites</h1>
      </header>
      {!data || !data.data.length ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-neutral-400">
          Your garage is empty...for now
        </div>
      ) : (
        <>
          <Listings data={data.data} variant="favorites" />
          <Toast message={message} />
        </>
      )}
    </main>
  );
}
