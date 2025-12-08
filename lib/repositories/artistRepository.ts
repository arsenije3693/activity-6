// lib/repositories/artistRepository.ts

import { artists, Artist } from "../artists";

export const ArtistRepository = {
  getAll(): Artist[] {
    return artists;
  },

  getById(id: number): Artist | undefined {
    return artists.find((a) => a.id === id);
  },

  create(data: Artist): Artist {
    const newArtist = {
      ...data,
      id: artists.length + 1
    };
    artists.push(newArtist);
    return newArtist;
  },

  delete(id: number): void {
    const index = artists.findIndex((a) => a.id === id);
    if (index !== -1) artists.splice(index, 1);
  }
};
