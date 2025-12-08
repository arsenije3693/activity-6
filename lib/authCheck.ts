// lib/authCheck.ts

export function requireUser(session: any) {
  if (!session || !session.user) {
    throw new Error("Unauthorized – User login required");
  }
}

export function requireAdmin(session: any) {
  if (!session || session.user?.role !== "admin") {
    throw new Error("Forbidden – Admin only");
  }
}
