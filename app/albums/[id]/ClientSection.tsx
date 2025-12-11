"use client";

import { useSession } from "next-auth/react";
import AddReviewForm from "./AddReviewForm";

export default function ClientSection({ albumId }: { albumId: number }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p style={{ opacity: 0.7 }}>Loading session...</p>;
  }

  const role = session?.user?.role ?? "guest";
  const userName = session?.user?.name;
  const isUser = role === "user" || role === "admin";
  const isAdmin = role === "admin";

  const handleDeleteAlbum = async () => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    
    const response = await fetch(`/api/albums/${albumId}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      window.location.href = "/";
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <p style={{ marginBottom: "0.5rem" }}>
        Role: <strong>{role}</strong>
        {userName && <span> | User: <strong>{userName}</strong></span>}
      </p>

      {isAdmin && (
        <button
          onClick={handleDeleteAlbum}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Delete Album
        </button>
      )}

      {isUser ? (
        <AddReviewForm albumId={albumId} />
      ) : (
        <p style={{ opacity: 0.7 }}>Sign in to leave a review.</p>
      )}
    </div>
  );
}
