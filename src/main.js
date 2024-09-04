import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import './styles.css'
// import './assets/main.css'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})

app.use(createPinia())
app.use(router)

app.mount('#app')