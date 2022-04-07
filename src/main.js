import { createApp } from 'vue';
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import { Container, MenuLeft } from '@/components/public';
const app = createApp(App).use(router).use(createPinia());
app.component('Container', Container);
app.component('MenuLeft', MenuLeft);
app.mount('#app')