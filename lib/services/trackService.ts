// lib/services/trackService.ts

import { TrackRepository } from "../repositories/trackRepository";
import { requireAdmin } from "../authCheck";

export const TrackService = {
  getAll() {
    return TrackRepository.getAll();
  },

  getById(id: number) {
    return TrackRepository.getById(id);
  },

  getByAlbum(albumId: number) {
    return TrackRepository.getByAlbum(albumId);
  },

  create(session: any, data: any) {
    requireAdmin(session);        // only admins can create tracks
    return TrackRepository.create(data);
  },

  delete(session: any, id: number) {
    requireAdmin(session);        // only admins can delete
    return TrackRepository.delete(id);
  }
};
