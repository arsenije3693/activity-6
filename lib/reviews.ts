// lib/reviews.ts
import { promises as fs } from 'fs';
import path from 'path';

export type Review = {
  id: number;
  albumId: number;
  reviewer: string;
  rating: number;
  comment: string;
};

const reviewsPath = path.join(process.cwd(), 'lib', 'reviews.json');

export function loadReviews(): Review[] {
  try {
    const data = require('./reviews.json');
    return data;
  } catch {
    return [];
  }
}

export async function saveReviews(reviews: Review[]): Promise<void> {
  await fs.writeFile(reviewsPath, JSON.stringify(reviews, null, 2));
}

export const reviews: Review[] = loadReviews();
