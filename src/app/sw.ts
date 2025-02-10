import { defaultCache } from "@serwist/next/browser";
import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";

declare const self: ServiceWorkerGlobalScope & {
  // Change this attribute's name to your `injectionPoint`.
  // `injectionPoint` is an InjectManifest option.
  // See https://serwist.pages.dev/docs/build/inject-manifest/configuring
  __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const revision = crypto.randomUUID();

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      urlPattern: /^\/_next\/static\/.*/, // Cache Next.js static files (CSS, JS)
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-files",
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 20 }, 
      },
    },
    {
      urlPattern: /^\/_next\/image\?url=.*/, // Cache Next.js optimized images
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-image-cache",
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 }, // Cache for 7 days
      },
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/",
        revision,
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
  importScripts: ["custom-sw.js"],
});
