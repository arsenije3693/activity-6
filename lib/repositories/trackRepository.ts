// lib/repositories/trackRepository.ts

import { tracks, Track } from "../tracks";

export const TrackRepository = {
  getAll(): Track[] {
    return tracks;
  },

  getById(id: number): Track | undefined {
    return tracks.find((t) => t.id === id);
  },

  getByAlbum(albumId: number): Track[] {
    return tracks.filter((t) => t.albumId === albumId);
  },

  create(data: Track): Track {
    const newTrack = {
      ...data,
      id: tracks.length + 1
    };
    tracks.push(newTrack);
    return newTrack;
  },

  delete(id: number): void {
    const index = tracks.findIndex((t) => t.id === id);
    if (index !== -1) tracks.splice(index, 1);
  }
};
