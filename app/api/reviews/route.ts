// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { ReviewService } from "../../../lib/services/reviewService";


import { getServerSession } from "next-auth";

export async function GET() {
  const data = ReviewService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  const body = await req.json();
  const created = ReviewService.create(session, body);
  return NextResponse.json(created);
}
