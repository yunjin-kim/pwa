importScripts("/firebase-config.js");
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("백그라운드 메시지 수신:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});

self.addEventListener("push", (event) => {
  console.log("📩 Push 이벤트 발생:", event);

  // 알림 데이터를 파싱
  const data = event.data && event.data?.json() ? event.data.json() : {};
  console.log("📩 Push 데이터:", data);

  // 기본 알림 구성
  const notificationTitle = data.title || "기본 제목";
  const notificationOptions = {
    body: data.body || "기본 내용",
    icon: data.icon || "/icon.png",
  };

  // 알림 표시
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
