import { defineAsyncComponent } from 'vue';
import MenuLeft from './menuLeft.vue';
const Container = defineAsyncComponent(() => import(/* webpackChunkName: "container" */ './container.vue'));
export { Container, MenuLeft };
