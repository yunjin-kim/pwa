import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("서비스 워커 등록 완료 ✅", registration);
    })
    .catch((error) => {
      console.error("서비스 워커 등록 실패 ❌", error);
    });
}
