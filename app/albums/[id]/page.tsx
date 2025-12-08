// app/albums/[id]/page.tsx

import { albums } from "../../../lib/albums";
import { artists } from "../../../lib/artists";
import { tracks } from "../../../lib/tracks";
import { reviews } from "../../../lib/reviews";
import { getServerSession } from "next-auth";
import Image from "next/image";

type PageProps = {
  params: { id: string };
};

export default async function AlbumDetailPage({ params }: PageProps) {
  const albumId = Number(params.id);

  // find the album
  const album = albums.find((a) => a.id === albumId);
  if (!album) {
    return (
      <div style={{ padding: "2rem", color: "white" }}>
        <h1>Album not found</h1>
      </div>
    );
  }

  // artist matched from artists.ts
  const artist = artists.find((a) => a.name === album.artist);

  // tracks + reviews for this album
  const albumTracks = tracks.filter((t) => t.albumId === albumId);
  const albumReviews = reviews.filter((r) => r.albumId === albumId);

  // session + roles
  const session = await getServerSession();
  console.log("SESSION DEBUG >>>", session);

  const role = (session?.user as any)?.role ?? "guest";
  const isAdmin = role === "admin";
  const isUser = role === "user" || isAdmin;

  return (
    <div
      style={{
        padding: "2rem",
        color: "#f9fafb",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      {/* Album header */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
        <div
          style={{
            width: "240px",
            height: "240px",
            borderRadius: "12px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src={album.coverUrl}
            alt={album.title}
            width={240}
            height={240}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            {album.title}
          </h1>
          <p style={{ margin: 0, fontSize: "1.1rem", opacity: 0.9 }}>
            {album.artist}
          </p>
          <p style={{ marginTop: "0.25rem", opacity: 0.7 }}>
            Year: {album.year}
          </p>

          <p style={{ marginTop: "0.75rem", fontSize: "0.9rem", opacity: 0.8 }}>
            Role: <strong>{role}</strong>
          </p>
        </div>
      </div>

      {/* Artist section */}
      {artist && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Artist Info
          </h2>
          <p style={{ margin: 0 }}>
            <strong>{artist.name}</strong> — {artist.genre}
          </p>
        </section>
      )}

      {/* Tracks */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Tracks</h2>

        {albumTracks.length === 0 && <p>No tracks for this album.</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {albumTracks.map((track) => (
            <li
              key={track.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid rgba(148,163,184,0.3)",
              }}
            >
              <span>
                {track.title}{" "}
                <span style={{ opacity: 0.7 }}>({track.duration})</span>
              </span>

              {/* Admin track delete */}
              {isAdmin && (
                <button
                  style={{
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    border: "none",
                    background: "#b91c1c",
                    color: "white",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  Delete (admin)
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Reviews</h2>

        {albumReviews.length === 0 && <p>No reviews yet.</p>}

        {albumReviews.map((review) => (
          <div
            key={review.id}
            style={{
              borderRadius: "8px",
              border: "1px solid rgba(148,163,184,0.4)",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.25rem",
              }}
            >
              <strong>{review.reviewer}</strong>
              <span>⭐ {review.rating}/5</span>
            </div>
            <p style={{ margin: 0 }}>{review.comment}</p>

            {/* Admin delete review */}
            {isAdmin && (
              <button
                style={{
                  marginTop: "0.5rem",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  border: "none",
                  background: "#b91c1c",
                  color: "white",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Delete Review (admin)
              </button>
            )}
          </div>
        ))}
      </section>

      {/* Review form or guest message */}
      {isUser ? (
        <section>
          <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
            Add a Review
          </h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
            (For Milestone 5 demo you can explain this form would POST to
            <code> /api/reviews </code>. Fully wiring it up is optional.)
          </p>
        </section>
      ) : (
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: 0.7 }}>
          Sign in as a user to leave a review.
        </p>
      )}
    </div>
  );
}
