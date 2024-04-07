import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  console.log("middleware", req.auth);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("is Logged in?", isLoggedIn);
});
