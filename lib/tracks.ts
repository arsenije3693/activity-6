// lib/tracks.ts

export type Track = {
  id: number;
  albumId: number;
  title: string;
  duration: string;
};

export const tracks: Track[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  albumId: i + 1,
  title: `Track for Album #${i + 1}`,
  duration: "3:00"
}));
