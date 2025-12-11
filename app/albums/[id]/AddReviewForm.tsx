"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function AddReviewForm({ albumId }: { albumId: number }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function submitReview() {
    const reviewerName = session?.user?.name || "Anonymous User";
    
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        albumId,
        reviewer: reviewerName,
        rating,
        comment,
      }),
    });

    if (response.ok) {
      alert("Review added!");
      window.location.reload();
    } else {
      alert("Failed to add review.");
    }
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <label>
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ marginLeft: "0.5rem" }}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        style={{
          display: "block",
          width: "100%",
          marginTop: "0.75rem",
          padding: "0.5rem",
        }}
      />

      <button
        onClick={submitReview}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          background: "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Submit Review
      </button>
    </div>
  );
}
