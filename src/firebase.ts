// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyqmtuu1a34rqBQmGwwKur1gcu-tBUgJA",
  authDomain: "pokemon-app-react.firebaseapp.com",
  projectId: "pokemon-app-react",
  storageBucket: "pokemon-app-react.appspot.com",
  messagingSenderId: "1036596573173",
  appId: "1:1036596573173:web:7edf02545bb5e2070866bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //firebaseConfig를 이용해서 app instance 생성

export default app;