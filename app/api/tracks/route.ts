// app/api/tracks/route.ts
import { NextResponse } from "next/server";
import { TrackService } from "../../../lib/services/trackService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const data = TrackService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const created = TrackService.create(session, body);
  return NextResponse.json(created);
}
