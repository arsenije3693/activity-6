"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);

  const role = session?.user?.role ?? "guest";
  const displayName = session?.user?.name ?? "Guest";
  const isLoggedIn = !!session;

  const linkClass = (href: string) =>
    "nav-link" + (pathname === href ? " bg-slate-800" : "");

  return (
    <header className="navbar">
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      <div>
        <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>My Music</div>
        <div style={{ fontWeight: 700 }}>Sparks Album List – Debug Nav</div>
      </div>

      <nav className="nav-links"> 
     
        <Link href="/" className={linkClass("/")}>Main</Link>
       

        {!isLoggedIn && (
          <button
            onClick={() => setShowLogin(true)}
            className="nav-item nav-link"
          >
            Sign In
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={() => signOut({ redirect: false })}
            className="nav-item nav-link"
          >
            Sign Out
          </button>
        )}

        <span style={{ marginLeft: "1rem", color: "white" }}>
          {displayName} — <strong>{role}</strong>
        </span>
      </nav>
    </header>
  );
}
