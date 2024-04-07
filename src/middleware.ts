import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  console.log("middleware", req.auth);
});
