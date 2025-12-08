import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email;
      }

      const admins = (process.env.ADMIN_EMAILS ?? "").split(",");
      token.role = admins.includes(token.email ?? "") ? "admin" : "user";

      return token;
    },

    async session({ session, token }) {
      session.user = session.user || {};
      session.user.role = token.role;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
