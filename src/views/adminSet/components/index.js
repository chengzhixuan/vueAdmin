import { defineAsyncComponent } from 'vue'
const SetPower = defineAsyncComponent({
    loader: () =>
        import ( /* webpackChunkName: "setPower" */ "./setPower.vue"),
    delay: 200,
    timeout: 3000,
});
export { SetPower };