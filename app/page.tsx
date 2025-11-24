// app/page.tsx

import AlbumCard from "./components/AlbumCard";
import { albums } from "@/lib/albums";
import Link from "next/link";

export default function DebugAlbumPage() {
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
