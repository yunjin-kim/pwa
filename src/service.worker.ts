// workbox.routing.registerRoute(
//   new RegExp("https://myapi.com/"),
//   new workbox.strategies.NetworkFirst({
//     cacheName: "api-cache",
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxAgeSeconds: 60 * 60 * 24, // 하루 동안 캐싱
//       }),
//     ],
//   })
// );
