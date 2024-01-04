import * as Sentry from "@sentry/nextjs";
const SENTRY_ENABLED =
  process.env.NEXT_PUBLIC_DEVELOPMENT_TYPE === "production";

if (SENTRY_ENABLED) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_URL,

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: true,
    logLevel: "info",
  });
}
