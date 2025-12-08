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
          year: Number(year) || new Date().getFullYear(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Create Album</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        <label>Artist</label>
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        <label>Year</label>
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ display: "block", marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
