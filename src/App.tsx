import {useEffect, useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

let installPrompt: BeforeInstallPromptEvent | null = null;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{outcome: "accepted" | "dismissed"}>;
  prompt(): Promise<void>;
}

function App() {
  const [count, setCount] = useState(0);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      console.log("permission: ", permission);
    }
    requestPermission();
  }, []);

  const handleClickInstallButton = async () => {
    if (!installPrompt) {
      alert("앱을 설치할 수 없는 환경이거나 이미 설치되었습니다.");
      return;
    }

    await installPrompt.prompt();

    const {outcome} = await installPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("사용자가 PWA 설치를 허용했습니다.");
    } else {
      console.log("사용자가 PWA 설치를 거부했습니다.");
    }

    installPrompt = null;
    setIsInstallable(false);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      installPrompt = event;
      setIsInstallable(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as EventListener
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as EventListener
      );
    };
  }, []);
  return (
    <>
      {isInstallable && (
        <button onClick={handleClickInstallButton}>Install</button>
      )}

      <div>
        <div className="contents">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
