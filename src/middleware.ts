import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/lib/routes";
import { auth } from "./auth";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }
  const session = await auth();
  const user1 = session?.user;
  console.log("user role in session in middleware", user1?.role);

  const user2 = req.auth?.user;
  console.log("user role in req.auth in middleware", user2?.role);

  // When the user visits the auth route
  if (isAuthRoute) {
    // If it's already logged in we redirect them
    if (isLoggedIn) {
      const role = session?.user.role;
      return Response.redirect(
        new URL(role ? "/dashboard" : DEFAULT_LOGIN_REDIRECT, nextUrl.origin),
      );
    }
    // Otherwise remain in the login page
    return;
  }

  // If the route is not public and I am not logged in
  if (!isLoggedIn && !isPublicRoute) {
    // We store this path for later
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
