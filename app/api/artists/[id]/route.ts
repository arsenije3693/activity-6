// app/api/artists/[id]/route.ts
import { NextResponse } from "next/server";
import { ArtistService } from "../../../../lib/services/artistService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET(_: any, { params }: any) {
  const artist = ArtistService.getById(Number(params.id));
  if (!artist) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(artist);
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession(authOptions);
  ArtistService.delete(session, Number(params.id));
  return NextResponse.json({ message: "Deleted" });
}
