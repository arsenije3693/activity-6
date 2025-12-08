// lib/repositories/reviewRepository.ts

import { reviews, Review } from "../reviews";

export const ReviewRepository = {
  getAll(): Review[] {
    return reviews;
  },

  getByAlbum(albumId: number): Review[] {
    return reviews.filter((r) => r.albumId === albumId);
  },

  create(data: Review): Review {
    const newReview = {
      ...data,
      id: reviews.length + 1
    };
    reviews.push(newReview);
    return newReview;
  },

  delete(id: number): void {
    const index = reviews.findIndex((r) => r.id === id);
    if (index !== -1) reviews.splice(index, 1);
  }
};
