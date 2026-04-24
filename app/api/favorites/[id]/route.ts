import { NextResponse } from "next/server";
import { APIError } from "../../../../types";
import { devdb } from "../../../../lib/db";

const db = devdb();

export const GET = async (
  _: Request,
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;
    db.read();
    const fav = db.data.find((fav) => fav.id === id);
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
  { params }: { params: { id: string } },
) => {
  try {
    const { id } = params;
    db.read();
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
