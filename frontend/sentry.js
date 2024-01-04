import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // ...
  configFile: "sentry.client.config.js",
  // ...
});