const routers = [{
    path: '/',
    name: 'Home',
    meta: {
        noAauth: true,
    },
    component: () =>
        import ( /* webpackChunkName: 'Home' */ '../views/public/Home.vue'),
}, {
    path: '/setting',
    name: 'setting',
    meta: {
        auth: true,
    },
    component: () =>
        import ( /* webpackChunkName: 'setting' */ '../views/public/setting.vue'),
}, {
    path: '/login',
    name: 'login',
    meta: {
        noAauth: true,
    },
    component: () =>
        import ( /* webpackChunkName: 'login' */ '../views/public/login.vue'),
}, ];
export default routers;