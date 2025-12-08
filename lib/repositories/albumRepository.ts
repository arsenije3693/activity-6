import { albums } from "../albums";

export const AlbumRepository = {
  getAll() {
    return albums;
  },

  getById(id: number) {
    return albums.find(a => a.id === id);
  },

  update(id: number, data: any) {
    const index = albums.findIndex(a => a.id === id);
    if (index === -1) return null;

    albums[index] = {
      ...albums[index],
      ...data,
    };

    return albums[index];
  },

  delete(id: number) {
    const index = albums.findIndex(a => a.id === id);
    if (index !== -1) albums.splice(index, 1);
  }
};
