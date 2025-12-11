import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "admin" | "user" | "guest";
  }

  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "user" | "guest";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    email?: string | null;
    role?: "admin" | "user" | "guest";
  }
}
