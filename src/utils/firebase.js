// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7sBTq63MnHh-w2cvS7Trq7b8bydOeHSQ",
  authDomain: "netflix-gpt-89af5.firebaseapp.com",
  projectId: "netflix-gpt-89af5",
  storageBucket: "netflix-gpt-89af5.appspot.com",
  messagingSenderId: "277088511957",
  appId: "1:277088511957:web:37450bcbeaa3ec12407f5c",
  measurementId: "G-ZS3JTMP0FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
