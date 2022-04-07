const routers = [{
    path: '/echart',
    name: 'echart',
    component: () =>
        import ( /* webpackChunkName: 'echartline' */ '../views/public/echart.vue'),
}];
export default routers;