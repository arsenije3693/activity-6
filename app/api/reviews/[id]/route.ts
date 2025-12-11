// app/api/reviews/[id]/route.ts
import { NextResponse } from "next/server";
import { ReviewService } from "../../../../lib/services/reviewService";
import { Review } from "../../../../lib/reviews";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET(_: any, { params }: any) {
  const review = ReviewService.getAll().find((r: Review) => r.id === Number(params.id));

  if (!review) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(review);
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { loadReviews, saveReviews } = await import("../../../../lib/reviews");
  const reviews = loadReviews();
  const filteredReviews = reviews.filter(r => r.id !== Number(params.id));
  
  if (reviews.length === filteredReviews.length) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  
  await saveReviews(filteredReviews);
  return NextResponse.json({ message: "Deleted" });
}
