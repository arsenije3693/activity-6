// app/api/albums/route.ts

import { NextResponse } from "next/server";
import { albums } from "@/lib/albums";

export async function GET() {
  return NextResponse.json(albums);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newAlbum = {
    id: Math.max(...albums.map(a => a.id)) + 1,
    ...body
  };
  albums.push(newAlbum);
  return NextResponse.json(newAlbum);
}
