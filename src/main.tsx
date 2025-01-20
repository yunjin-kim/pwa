import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.ts"; // 추가

// Initialize Firebase

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

serviceWorkerRegistration.register();
