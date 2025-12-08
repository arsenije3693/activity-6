"use client";

import { signIn } from "next-auth/react";

export default function AdminLogin() {
  return (
    <div style={{ padding: 40 }}>
      <button
        onClick={() =>
          signIn("credentials", { role: "admin", redirect: true, callbackUrl: "/" })
        }
      >
        Login as ADMIN
      </button>
    </div>
  );
}
