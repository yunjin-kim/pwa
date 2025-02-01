import {writeFileSync} from "fs";
require("dotenv").config(); // `.env.local`을 읽어오기 위해 필요

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const content = `self.firebaseConfig = ${JSON.stringify(
  firebaseConfig,
  null,
  2
)};`;

writeFileSync("public/firebase-config.js", content);

console.log("✅ Firebase 설정 파일 생성 완료: public/firebase-config.js");
