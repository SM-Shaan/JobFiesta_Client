// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBup3xlvaWSk9zHYMwVhxb-ZILwoWz1fgY",
  authDomain: "job-portal-demo-bf997.firebaseapp.com",
  projectId: "job-portal-demo-bf997",
  storageBucket: "job-portal-demo-bf997.appspot.com",
  messagingSenderId: "830003064418",
  appId: "1:830003064418:web:f5fc843cf4304b53a2ab3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;