"use client";

import { signIn } from "next-auth/react";

export default function UserLogin() {
  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={() =>
          signIn("credentials", { role: "user", redirect: true, callbackUrl: "/" })
        }
      >
        Login as USER
      </button>
    </div>
  );
}
