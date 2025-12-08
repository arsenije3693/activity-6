"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}>
      <div style={{
        background: "#1e293b",
        padding: "2rem",
        borderRadius: 12,
        width: "300px",
        color: "white"
      }}>
        <h2>Sign In</h2>

        {/* Admin option */}
        <button
          style={{ marginTop: "1rem", width: "100%" }}
          onClick={() => signIn("github")}
        >
          Sign in as Admin (GitHub)
        </button>

        {/* User option */}
        <div style={{ marginTop: "1.5rem" }}>
          <label>Your Username:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            style={{
              width: "100%",
              padding: "6px",
              marginTop: "4px",
              borderRadius: 6,
            }}
          />
          <button
            style={{ marginTop: "0.75rem", width: "100%" }}
            onClick={() => {
              sessionStorage.setItem("manualUser", name);
              sessionStorage.setItem("manualRole", "user");
              onClose();
              window.location.reload();
            }}
          >
            Continue as User
          </button>
        </div>

        {/* Guest */}
        <button
          style={{ marginTop: "1rem", width: "100%" }}
          onClick={() => {
            sessionStorage.removeItem("manualUser");
            sessionStorage.removeItem("manualRole");
            onClose();
            window.location.reload();
          }}
        >
          Continue as Guest
        </button>

        <button
          style={{ marginTop: "1rem", width: "100%", opacity: 0.5 }}
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}
