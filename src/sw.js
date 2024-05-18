/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching';
import { NetworkFirst } from 'workbox-strategies';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { offlineFallback, staticResourceCache } from 'workbox-recipes';

setDefaultHandler(new NetworkFirst());
precacheAndRoute(self.__WB_MANIFEST);

// css, script 정적 파일 캐시
staticResourceCache();

// 이미지 캐시
registerRoute(
  ({ request }) => request.destination === 'image',
  new NetworkFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
        maxEntries: 50,
      }),
    ],
  }),
);

// 캐싱된 응답이 없을 때 offline.html 제공
offlineFallback();
