const routers = [
	{
		path: '/adminSet/accountSet',
		name: 'accountSet',
		component: () => import(/* webpackChunkName: 'accountSet' */ '../views/adminSet/accountSet.vue'),
	},
];
export default routers;
