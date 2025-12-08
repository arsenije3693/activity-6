// /lib/authState.ts
export type Role = "guest" | "user" | "admin";

export function setAuth(role: Role, name?: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("role", role);
    localStorage.setItem("name", name ?? (role === "guest" ? "Guest" : "User"));
  }
}

export function getAuth() {
  if (typeof window === "undefined") {
    return { role: "guest" as Role, name: "Guest" };
  }

  const role = (localStorage.getItem("role") as Role) || "guest";
  const name = localStorage.getItem("name") || "Guest";

  return { role, name };
}
