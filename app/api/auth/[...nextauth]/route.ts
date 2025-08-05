import NextAuth, { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist accessToken
      if (account) {
        token.accessToken = account.access_token;
      }
      // Store Keycloak user id (sub) for later
      if (profile?.sub) {
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach Keycloak sub to session.user.id
      session.user = {
        ...session.user,
        // Extend session.user with id using type assertion to avoid type error
        ...(session.user as object),
        id: token.id as string,
      } as typeof session.user & { id: string };
      // Attach accessToken directly to session with type assertion
      (session as any).accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  events: {
    async signOut() {
      console.log("User signed out");
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
