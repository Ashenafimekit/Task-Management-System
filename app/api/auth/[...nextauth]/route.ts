import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const hardcodedUser = {
          id: "1",
          username: "melos",
          password: "password",
        };

        if (
          credentials?.username === hardcodedUser.username &&
          credentials?.password === hardcodedUser.password
        ) {
          return { id: hardcodedUser.id, name: hardcodedUser.username };
        }

        throw new Error("Invalid username or password");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, account }: { token: any; account: any }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

// This allows Next.js to handle API route with NextAuth
export { handler as GET, handler as POST };
