// lib/services/reviewService.ts

import { ReviewRepository } from "../repositories/reviewRepository";
import { requireUser } from "../authCheck";

export const ReviewService = {
  getAll() {
    return ReviewRepository.getAll();
  },

  getByAlbum(albumId: number) {
    return ReviewRepository.getByAlbum(albumId);
  },

  create(session: any, data: any) {
    requireUser(session);  // logged-in users + admins
    return ReviewRepository.create(data);
  },

  delete(session: any, id: number) {
    requireUser(session);
    return ReviewRepository.delete(id);
  }
};
