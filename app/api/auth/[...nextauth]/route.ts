import { authOptions } from "@/lib/auth-option";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// This allows Next.js to handle API route with NextAuth
export { handler as GET, handler as POST };
