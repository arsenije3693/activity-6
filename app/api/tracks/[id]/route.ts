// app/api/tracks/[id]/route.ts
import { NextResponse } from "next/server";
import { TrackService } from "../../../../lib/services/trackService";

import { getServerSession } from "next-auth";

export async function GET(_: any, { params }: any) {
  const track = TrackService.getById(Number(params.id));
  if (!track) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(track);
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession();
  TrackService.delete(session, Number(params.id));
  return NextResponse.json({ message: "Deleted" });
}
