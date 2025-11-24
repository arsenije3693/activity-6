// app/api/albums/route.ts

import { NextResponse } from "next/server";
import { albums } from "@/lib/albums";

export async function GET() {
  return NextResponse.json(albums);
}
