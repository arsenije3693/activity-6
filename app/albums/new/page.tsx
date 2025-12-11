"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAlbumPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
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
          coverUrl: coverUrl || "https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg",
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
    <div style={{ padding: "2rem", color: "white", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create New Album</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              width: "100%", 
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Artist *</label>
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              width: "100%", 
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={new Date().getFullYear().toString()}
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              width: "100%", 
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Cover URL</label>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://example.com/cover.jpg"
            style={{ 
              display: "block", 
              padding: "0.5rem", 
              width: "100%", 
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

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
            background: submitting ? "#6b7280" : "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: submitting ? "not-allowed" : "pointer",
            marginRight: "1rem",
          }}
        >
          {submitting ? "Creating..." : "Create Album"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}