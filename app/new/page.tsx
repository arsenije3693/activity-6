"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAlbumPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          artist,
          year: Number(year) || new Date().getFullYear()
        })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      await res.json();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to create album.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Create Album (Simple Form)</h2>
        <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
          Fill in the fields below and submit. The album will be added to the
          in-memory list on the server and appear in the JSON stream on the
          home page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Album title"
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist</label>
          <input
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist name"
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year (optional)</label>
          <input
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2025"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button
          type="submit"
          className="button button-primary"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
