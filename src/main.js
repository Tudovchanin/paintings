import { createApp } from 'vue'
import App from './App.vue'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

AOS.init({once: true});

createApp(App).mount('#app')
