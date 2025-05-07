// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDr1wMD9Az_1haZA6HKFFPFvJOVl5hS-5A",
    authDomain: "menu-digital-donosvaldo.firebaseapp.com",
    databaseURL: "https://menu-digital-donosvaldo-default-rtdb.firebaseio.com",
    projectId: "menu-digital-donosvaldo",
    storageBucket: "menu-digital-donosvaldo.firebasestorage.app",
    messagingSenderId: "9786783466",
    appId: "1:9786783466:web:8f44bd8ceb34260d6c8993",
    measurementId: "G-36N6N8G3H4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
