// app/page.tsx

"use client";

import AlbumCard from "./components/AlbumCard";
import { albums } from "@/lib/albums";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DebugAlbumPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCreateAlbum = () => {
    router.push("/albums/new");
  };

  return (
    <main style={{ padding: "1.5rem" }}>
      {/* Header + Create button row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.25rem" }}>
            Sparks Album List (Debug View) – Arsenije Brajovic
          </h1>

          <p style={{ marginBottom: 0, opacity: 0.85 }}>
            This JSON data is rendered directly from the API response.
          </p>
        </div>

        {/* Admin-only Create New Album Button */}
        {session?.user.role === "admin" && (
          <button
            onClick={handleCreateAlbum}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#1e40af",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create New Album
          </button>
        )}
      </div>

      {/* Cards section */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>
          Album Cards (Preview)
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Raw JSON section */}
      <section>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
          Raw JSON from /api/albums
        </h2>
        <pre
          style={{
            backgroundColor: "#020617",
            padding: "1rem",
            borderRadius: "8px",
            overflow: "auto",
            color: "#e5e7eb",
            fontSize: "0.9rem",
            lineHeight: 1.4,
            border: "1px solid #1e293b",
          }}
        >
          {JSON.stringify(albums, null, 2)}
        </pre>
      </section>
    </main>
  );
}
