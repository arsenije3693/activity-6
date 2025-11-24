import { getServerSession } from "next-auth";

export async function requireAdmin() {
  const session = await getServerSession();

  // If you want to restrict admin access:
  // You can check email instead of role  
  const allowedAdmins = [process.env.ADMIN_EMAILS];

  if (!session || !allowedAdmins.includes(session.user?.email || "")) {
    return {
      ok: false,
      response: new Response("Unauthorized", { status: 401 }),
    };
  }

  return { ok: true, session };
}
