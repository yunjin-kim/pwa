import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("서비스 워커 등록 완료 ✅", registration);
      const subscription = subscribeToPushService(registration);
      console.log("🔔 푸시 서비스 구독 성공:", subscription);
    })
    .catch((error) => {
      console.error("서비스 워커 등록 실패 ❌", error);
    });
}

async function subscribeToPushService(registration: ServiceWorkerRegistration) {
  if (!registration.pushManager) {
    console.error("❌ 푸시 매니저가 지원되지 않습니다.");
    return null;
  }

  // VAPID 키 설정 (Firebase 콘솔의 VAPID 키 사용)
  const vapidPublicKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  if (!vapidPublicKey) {
    console.log("❌ VAPID 키가 설정되지 않았습니다.");
    return;
  }
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  // 🔥 푸시 서비스 구독 요청
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true, // 알림이 사용자에게 항상 표시되어야 함
    applicationServerKey: convertedVapidKey, // VAPID 공개 키
  });

  return subscription;
}

/**
 * URL Base64 형식의 VAPID 키를 Uint8Array로 변환
 */
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
