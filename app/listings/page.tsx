import Link from "next/link";

import { Listings } from "../../components/Listings";

export default function ListingsPage() {
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

      <Listings />
    </main>
  );
}
