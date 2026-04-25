import { NextResponse } from "next/server";
import { APIError } from "../../../../types";
import { devdb } from "../../../../lib/db";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const db = devdb();
    db.read();
    db.data ||= [];
    const fav = db.data.find((favorite) => favorite.id === id);
    if (!fav) {
      return NextResponse.json({ message: "Favorite not found" } as APIError, {
        status: 404,
      });
    }
    return NextResponse.json(
      { data: fav },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch favorite" } as APIError,
      {
        status: 500,
      },
    );
  }
};

export const DELETE = async (
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const db = devdb();
    db.read();
    db.data ||= [];
    const idExists = db.data.some((item) => item.id === id);
    if (!idExists) {
      return NextResponse.json({ message: "Favorite not found" } as APIError, {
        status: 404,
      });
    }
    db.data = db.data.filter((item) => item.id !== id);
    db.write();
    return NextResponse.json(
      { data: db.data },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete favorite" } as APIError,
      {
        status: 500,
      },
    );
  }
};
