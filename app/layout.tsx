import "./globals.css";
import type { ReactNode } from "react";
import NavBar from "./components/NavBar";
import SessionWrapper from "./SessionWrapper";

export const metadata = {
  title: "Sparks Music App – Arsenije Brajovic",
  description: "CST-391 Music App Debug View",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <NavBar />
          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
