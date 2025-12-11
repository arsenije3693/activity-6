// app/api/reviews/route.ts
import { NextResponse } from "next/server";
import { loadReviews, saveReviews } from "../../../lib/reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const reviews = loadReviews();
  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  
  const reviews = loadReviews();
  const newReview = {
    id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
    ...body
  };
  
  reviews.push(newReview);
  await saveReviews(reviews);
  
  return NextResponse.json(newReview, { status: 201 });
}
