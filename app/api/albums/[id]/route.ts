import { NextResponse } from "next/server";
import { albums } from "@/lib/albums";

export async function GET(_req: Request, context: { params: { id: string } }) {
  const id = Number(context.params.id);

  const album = albums.find((a) => a.id === id);

  if (!album) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(album);
}
