"use client";

import Link from "next/link";

import { Listings } from "../../components/Listings";
import { useGetListingsQuery } from "../../store/services/listings";
import { Toast } from "../../components/Toast";
import { useToast } from "../../hooks/useToast";

export default function ListingsPage() {
  const { data, isLoading } = useGetListingsQuery();
  const { message } = useToast();

  if (isLoading) {
    return <div>Loading...</div>;
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
        <h1 className="text-3xl font-semibold tracking-tight">Listings</h1>
      </header>
      {!data || !data.data.length ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-neutral-400">
          No data found
        </div>
      ) : (
        <>
          <Listings data={data.data} />
          <Toast message={message} />
        </>
      )}
    </main>
  );
}
