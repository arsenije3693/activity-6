"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditAlbumPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const albumId = Number(params.id);

  const [album, setAlbum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/albums/${albumId}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setAlbum(data);
      setLoading(false);
    }
    load();
  }, [albumId]);

  if (loading) return <p style={{ color: "white" }}>Loading…</p>;
  if (!album) return <p style={{ color: "white" }}>Album not found.</p>;

  const updateField = (field: string, value: any) => {
    setAlbum({ ...album, [field]: value });
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Edit Album #{albumId}</h1>

      <div style={{ marginTop: "2rem" }}>
        <label>Title</label>
        <input
          value={album.title}
          onChange={(e) => updateField("title", e.target.value)}
          style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
        />

        <label style={{ marginTop: "1.5rem" }}>Artist</label>
        <input
          value={album.artist}
          onChange={(e) => updateField("artist", e.target.value)}
          style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
        />

        <label style={{ marginTop: "1.5rem" }}>Year</label>
        <input
          value={album.year}
          onChange={(e) => updateField("year", Number(e.target.value))}
          style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
        />

        <button
          onClick={async () => {
            const res = await fetch(`/api/albums/${albumId}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(album),
            });

            if (!res.ok) {
              alert("Update failed.");
              return;
            }

            alert("Album updated!");
            router.push(`/albums/${albumId}`);
          }}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 1.5rem",
            background: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
