// app/api/reviews/[id]/route.ts
import { NextResponse } from "next/server";
import { ReviewService } from "../../../../lib/services/reviewService";
import { Review } from "../../../../lib/reviews";

import { getServerSession } from "next-auth";

export async function GET(_: any, { params }: any) {
  const review = ReviewService.getAll().find((r: Review) => r.id === Number(params.id));

  if (!review) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(review);
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession();
  ReviewService.delete(session, Number(params.id));
  return NextResponse.json({ message: "Deleted" });
}
