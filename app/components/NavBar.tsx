"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    "nav-link" + (pathname === href ? " bg-slate-800" : "");

  return (
    <header className="navbar">
      <div>
        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>My Music</div>
        <div style={{ fontWeight: 700 }}>Sparks Album List – Debug Nav</div>
      </div>
      <nav className="nav-links">
        <Link href="/" className={linkClass("/")}>
          Main
        </Link>
        <Link href="/new" className={linkClass("/new")}>
          New
        </Link>

        {/* FIXED BUTTONS */}
        <button
          onClick={() => signIn("github")}
          className="nav-item nav-link"
        >
          Sign In
        </button>

        <button
          onClick={() => signOut()}
          className="nav-item nav-link"
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
}
