import { NextResponse } from "next/server";
import { devdb } from "../../../lib/db";
import { APIError } from "../../../types";

const db = devdb();

export const GET = async () => {
  try {
    db.read();
    return NextResponse.json(
      { data: db.data ?? [] },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch favorites data" } as APIError,
      {
        status: 500,
      },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const listing = await req.json();
    if (!listing?.id) {
      return NextResponse.json(
        { message: "Invalid listing data. Missing id" } as APIError,
        { status: 400 },
      );
    }

    db.read();

    const idExists = db.data.some((item) => item.id === listing.id);
    if (!idExists) {
      db.data.push(listing);
      db.write();
    }

    return NextResponse.json(
      { data: db.data ?? [] },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add favorite" } as APIError,
      {
        status: 500,
      },
    );
  }
};
