import {
  clerkMiddleware,
  createClerkClient,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const APP_HOST = "localhost:3000";

const UNAUTHED_PATHS_CLERK = [
  "/_next/(.*)",
  "/favicon(.*)",
  "/icons(.*)",
  "/sounds(.*)",
  "/common(.*)",
  "/logout",
  "/manifest.json(.*)",
  "/public(.*)",
  "/re-upload(.*)",
  "/redirect(.*)", // for local development
  "/setup-worker(.*)",
  "/upload(.*)",
  "/web(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sw.js(.*)",
  "/workbox-(.*)",
  "/forgot-password",
  "/.well-known(.*)",
  "/monitoring-tunnel", // for sentry events to avoid ad blockers
  "/api/postSchedulingToSlack",
  "/maintenance",
  "/api/persistedOperations",
  "/locales(.*)",
];

const UNAUTHED_EXTENSIONS = [".png", ".svg", ".jpg", ".jpeg", ".gif", ".csv"];

const PATHS_TO_CHECK_FOR_USER = ["/dashboards/overview"];

const isUnauthedPath = createRouteMatcher(UNAUTHED_PATHS_CLERK);

const isUnauthedExtension = (path: string) => {
  return UNAUTHED_EXTENSIONS.some((ext) => path.endsWith(ext));
};

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  return clerkMiddleware(async (auth) => {
    const shouldAuth =
      !isUnauthedPath(req) && !isUnauthedExtension(req.nextUrl.pathname);

    if (shouldAuth) {
      try {
        const authData = auth().protect({
          unauthenticatedUrl: `${APP_HOST}/sign-in?redirectTo=${req.nextUrl.href}`,
        });

        // to prevent excessively hitting the Clerk API (which caused Vercel Edge function failures)
        // only hit the Clerk SDK if we are on a subset of pages
        if (PATHS_TO_CHECK_FOR_USER.includes(req.nextUrl.pathname)) {
          const user = await clerkClient.users.getUser(authData.userId);

          if (!user) {
            return NextResponse.redirect(
              `${APP_HOST}/sign-in?redirectTo=${encodeURIComponent(
                req.nextUrl.href
              )}`
            );
          }

          if (user.passwordEnabled && req.nextUrl.href.includes("welcome")) {
            return NextResponse.redirect(`${APP_HOST}/dashboards/overview`);
          }

          if (!user.passwordEnabled && !req.nextUrl.href.includes("welcome")) {
            return NextResponse.redirect(`${APP_HOST}/welcome`);
          }
        }
      } catch (error) {
        console.error("Error in middleware", error);
      }
    }
  })(req, event);
}
