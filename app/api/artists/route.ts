// app/api/artists/route.ts
import { NextResponse } from "next/server";
import { ArtistService } from "../../../lib/services/artistService";

import { getServerSession } from "next-auth";

export async function GET() {
  const data = ArtistService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  const body = await req.json();
  const created = ArtistService.create(session, body);
  return NextResponse.json(created);
}
