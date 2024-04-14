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
  // TODO: understand if it's better to check req.auth or auth() in the middleware
  // const isLoggedIn = !!req.auth;
  const isLoggedIn = !!(await auth());

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRoute) {
    return;
  }

  // When the user visits the auth route
  if (isAuthRoute) {
    // If it's already logged in we redirect them
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
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
