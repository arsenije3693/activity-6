// lib/services/artistService.ts

import { ArtistRepository } from "../repositories/artistRepository";
import { requireAdmin } from "../authCheck";

export const ArtistService = {
  getAll() {
    return ArtistRepository.getAll();
  },

  getById(id: number) {
    return ArtistRepository.getById(id);
  },

  create(session: any, data: any) {
    requireAdmin(session);
    return ArtistRepository.create(data);
  },

  delete(session: any, id: number) {
    requireAdmin(session);
    return ArtistRepository.delete(id);
  }
};
