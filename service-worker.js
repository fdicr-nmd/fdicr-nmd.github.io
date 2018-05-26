importScripts("/precache-manifest.ec688bd222d848cec28d7170ed74d7a8.js", "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/* eslint-env worker, serviceworker */
/* global workbox */

// Precache.
workbox.core.setCacheNameDetails({ prefix: 'fdi-front' });

/* eslint no-underscore-dangle: 0 */
/* eslint no-restricted-globals: 0 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Cache Google Fonts.
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
      }),
    ],
  }),
);

// Cache all images.
workbox.routing.registerRoute(
  /https:\/\/live-fdi.pantheonsite.io\/sites\/default\/files\/.+?\.(?:png|gif|jpg|jpeg)/i,
  workbox.strategies.networkFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

