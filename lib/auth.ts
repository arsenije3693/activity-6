import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (credentials?.name) {
          return {
            id: "user-" + credentials.name,
            name: credentials.name,
            role: "user",
          };
        }
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Handle GitHub login
      if (profile?.email) {
        token.email = profile.email;
        const admins = (process.env.ADMIN_EMAILS ?? "").split(",");
        token.role = admins.includes(profile.email) ? "admin" : "user";
      }
      
      // Handle credentials login
      if (user?.role) {
        token.role = user.role;
      }
      
      if (user?.name && !token.name) {
        token.name = user.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.role = token.role as "admin" | "user" | "guest";
      if (token.name) {
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};