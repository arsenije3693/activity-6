"use client";

import { useEffect, useState } from "react";

type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
  createdAt: string;
};

export default function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/albums");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data: Album[] = await res.json();
        setAlbums(data);
      } catch (err: any) {
        console.error("Error loading albums", err);
        setError(err.message || "Failed to load albums.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <div className="card">Loading albums from API…</div>;
  }

  if (error) {
    return (
      <div className="error">
        <strong>Error loading albums:</strong> {error}
      </div>
    );
  }

  return (
    <>
      <div className="card">
        <h2>Sparks Album List (Debug View) – Arsenije Brajovic</h2>
        <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
          This JSON data is rendered directly from the API response.
        </p>
      </div>

      <div className="card">
        <h3>Raw JSON from /api/albums</h3>
        <pre>{JSON.stringify(albums, null, 2)}</pre>
      </div>
    </>
  );
}
