// // Service Worker를 등록하거나 해제하는 유틸리티 함수
// const isLocalhost: boolean = Boolean(
//   window.location.hostname === "localhost" ||
//     // [::1]은 IPv6 localhost입니다.
//     window.location.hostname === "[::1]" ||
//     // 127.0.0.0/8는 IPv4 localhost입니다.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );

// interface Config {
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
// }

// // Service Worker 등록 함수
// export function register(config?: Config): void {
//   if ("serviceWorker" in navigator) {
//     const publicUrl = new URL(process.env.PUBLIC_URL!, window.location.href);
//     if (publicUrl.origin !== window.location.origin) {
//       // Service Worker가 다른 출처에서 실행되지 않도록 방지
//       return;
//     }

//     window.addEventListener("load", () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (isLocalhost) {
//         // 로컬 환경에서 Service Worker를 확인
//         checkValidServiceWorker(swUrl, config);

//         // 로컬 환경에서는 캐시를 비활성화하여 디버깅 가능
//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             "This web app is being served cache-first by a service worker in development mode."
//           );
//         });
//       } else {
//         // 로컬 환경이 아닌 경우 Service Worker를 등록
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// // 유효한 Service Worker를 등록
// function registerValidSW(swUrl: string, config?: Config): void {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);

//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === "installed") {
//             if (navigator.serviceWorker.controller) {
//               // 새로운 콘텐츠가 준비됨
//               console.log(
//                 "New content is available and will be used when all tabs are closed."
//               );

//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               // 콘텐츠가 캐싱됨
//               console.log("Content is cached for offline use.");

//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error("Error during Service Worker registration:", error);
//     });
// }

// // 기존 Service Worker가 유효한지 확인
// function checkValidServiceWorker(swUrl: string, config?: Config): void {
//   fetch(swUrl, {
//     headers: {"Service-Worker": "script"},
//   })
//     .then((response) => {
//       // Service Worker 파일이 찾을 수 있는지 확인
//       const contentType = response.headers.get("content-type");
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf("javascript") === -1)
//       ) {
//         // 파일이 없거나 유효하지 않음 -> 기존 Service Worker를 제거
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         // 유효한 Service Worker를 등록
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         "No internet connection found. App is running in offline mode."
//       );
//     });
// }

// // Service Worker 해제 함수
// export function unregister(): void {
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }
