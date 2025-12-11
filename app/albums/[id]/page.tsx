import { albums } from "../../../lib/albums";
import { artists } from "../../../lib/artists";
import { tracks } from "../../../lib/tracks";
import { reviews } from "../../../lib/reviews";

import Image from "next/image";
import ClientSection from "./ClientSection";
import ReviewsSection from "./ReviewsSection";

type PageProps = {
  params: { id: string };
};

export default async function AlbumDetailPage({ params }: PageProps) {
  // Find album based on dynamic id
  const albumId = Number(params.id);

  const album = albums.find((a) => a.id === albumId);
  if (!album) {
    return (
      <div style={{ padding: "2rem", color: "white" }}>
        <h1>Album not found</h1>
      </div>
    );
  }
// Fetch related data
  const artist = artists.find((a) => a.name === album.artist);
  const albumTracks = tracks.filter((t) => t.albumId === albumId);
  const albumReviews = reviews.filter((r) => r.albumId === albumId);


// Render album header
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
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews */}
      <ReviewsSection albumReviews={albumReviews} />

      {/* CLIENT COMPONENT HANDLES SESSION */}
      <ClientSection albumId={albumId} />
    </div>
  );
}
