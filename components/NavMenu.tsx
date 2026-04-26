"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetFavoritesQuery } from "../store/services/favorites";

export const NavMenu = () => {
  const pathname = usePathname();
  const { data } = useGetFavoritesQuery();
  const favoritesCount = data?.data.length ?? 0;

  const linkStyle = (path: string) =>
    `text-sm font-medium transition ${
      pathname === path ? "text-white" : "text-neutral-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-10 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="flex items-center gap-6 px-4 py-3">
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link href="/listings" className={linkStyle("/listings")}>
          Listings
        </Link>
        <Link href="/favorites" className={linkStyle("/favorites")}>
          Favorites ({favoritesCount})
        </Link>
      </div>
    </nav>
  );
};
