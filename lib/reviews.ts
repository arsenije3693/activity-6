// lib/reviews.ts

export type Review = {
  id: number;
  albumId: number;
  reviewer: string;
  rating: number;
  comment: string;
};

export const reviews: Review[] = [];
