// IMPORTS
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import { initializeApp } from 'firebase/app';
import router from './router/index';

// FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyARCmMDIU5LPjBMj_v_tYrhcUh8Aloynpo",
    authDomain: "isef01-quizius-maximus-v2.firebaseapp.com",
    projectId: "isef01-quizius-maximus-v2",
    storageBucket: "isef01-quizius-maximus-v2.appspot.com",
    messagingSenderId: "555791080708",
    appId: "1:555791080708:web:c890c0d237eb00c2764451"
};

initializeApp(firebaseConfig);

// VUE APP + ROUTING
const app = createApp(App);
app.use(router);
app.mount('#app');