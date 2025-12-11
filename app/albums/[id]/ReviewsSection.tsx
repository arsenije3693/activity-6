"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ReviewsSection({
  albumReviews,
}: {
  albumReviews: any[];
}) {
  const [localReviews, setLocalReviews] = useState(albumReviews);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    
    if (response.ok) {
      setLocalReviews(prev => prev.filter(r => r.id !== reviewId));
    }
  };

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Reviews</h2>

      {localReviews.length === 0 && <p>No reviews yet.</p>}

      {localReviews.map((review) => (
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
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>⭐ {review.rating}/5</span>
              {isAdmin && (
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  style={{
                    padding: "0.25rem 0.5rem",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                  }}
                >
                  Delete Review (admin)
                </button>
              )}
            </div>
          </div>

          <p style={{ margin: 0 }}>{review.comment}</p>
        </div>
      ))}
    </section>
  );
}
