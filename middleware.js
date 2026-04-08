import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = { 
  matcher: [
    "/chats/:path*",
    "/home",
    "/contacts/:path*",
    "/profile/:path*",
  ]
};