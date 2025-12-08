import { AlbumRepository } from "../repositories/albumRepository";
import { requireAdmin } from "../authCheck";

export const AlbumService = {
  getAll() {
    return AlbumRepository.getAll();
  },

  getById(id: number) {
    return AlbumRepository.getById(id);
  },

  update(session: any, id: number, data: any) {
    requireAdmin(session); // only admin can update
    return AlbumRepository.update(id, data);
  },

  delete(session: any, id: number) {
    requireAdmin(session);
    return AlbumRepository.delete(id);
  }
};
