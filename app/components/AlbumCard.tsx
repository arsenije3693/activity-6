"use client";

import { useSession } from "next-auth/react";
import type { Album } from "@/lib/albums";
import { useRouter } from "next/navigation";

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div
      style={{
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "1rem",
        background: "#0f172a",
        color: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {/* Clicking image or text = go to View Page */}
      <div
        onClick={() => router.push(`/albums/${album.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: "8px",
            marginBottom: "0.5rem",
          }}
        >
          <img
            src={album.coverUrl}
            alt={album.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <h3 style={{ fontSize: "1rem", margin: 0 }}>{album.title}</h3>
        <p style={{ margin: 0, opacity: 0.8 }}>{album.artist}</p>
        <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.7 }}>
          Year: {album.year}
        </p>
      </div>

      {/* Admin-only Edit Button */}
      {isAdmin && (
        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem",
            borderRadius: "6px",
            backgroundColor: "#1e40af",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => router.push(`/albums/edit/${album.id}`)}
        >
          Edit
        </button>
      )}
    </div>
  );
}
