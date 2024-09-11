// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJ6YTA-MOneTa8OmmVzYBhISK_iztBF_U",
    authDomain: "week7-aman.firebaseapp.com",
    projectId: "week7-aman",
    storageBucket: "week7-aman.appspot.com",
    messagingSenderId: "420941906846",
    appId: "1:420941906846:web:fff4ff231920193b890c8f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db