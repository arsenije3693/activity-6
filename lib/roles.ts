import { getServerSession } from "next-auth";

export async function requireAdmin() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

export async function requireUser() {
  const session = await getServerSession();
  return session?.user?.role === "user" || session?.user?.role === "admin";
}

export async function requireGuest() {
  const session = await getServerSession();
  return !session; // no session = guest
}
