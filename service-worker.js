importScripts("/precache-manifest.2d7d05016860a46ef6a092548e1bcd57.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-env worker, serviceworker */
/* global workbox */

// Precache.
workbox.core.setCacheNameDetails({ prefix: 'fdi-front' });

/* eslint no-underscore-dangle: 0 */
/* eslint no-restricted-globals: 0 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// Offline Google Analytics.
workbox.googleAnalytics.initialize();

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

