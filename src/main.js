import { createApp } from 'vue';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import { Container, MenuLeft } from '@/components/public';
const app = createApp(App).use(router).use(ElementPlus, { locale }).use(createPinia());
app.component('Container', Container);
app.component('MenuLeft', MenuLeft);
app.mount('#app')