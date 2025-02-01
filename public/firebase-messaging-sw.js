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

  let data;

  try {
    // JSON 형식인 경우 파싱
    data = event.data?.json();
  } catch (error) {
    // 문자열인 경우 처리
    console.warn("Push 데이터가 문자열 형식으로 전달됨:", event.data.text());
    data = {body: event.data.text()}; // 문자열 데이터를 기본 알림 본문으로 사용
  }

  console.log("📩 Push 데이터:", data);

  // 알림 구성
  const notificationTitle = data.title || "DevTools 테스트 알림";
  const notificationOptions = {
    body: data.body || "푸시 알림 테스트 중",
    icon: data.icon || "/icon.png",
  };

  // 알림 표시
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
