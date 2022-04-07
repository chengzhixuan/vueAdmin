import { createRouter, createWebHashHistory } from 'vue-router';
import publics from './public';
import adminSet from './adminSet';
import echart from './echart';
import localStorage from 'store';
import { PublicStore } from '@/store/Public';
const routesList = [...publics, ...adminSet, ...echart];
const routes = routesList.filter((i) => {
    return i.meta ? i.meta.noAauth : false;
});
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
const getRoutesAuth = (power) => { // 添加路由
    let powerList = routesList.filter((i) => { // 过滤掉不需要权限的路由 因为已经挂载过一次
        return !i.meta || !i.meta.noAauth
    })
    powerList.forEach(e => {
        if (power === 1 || power.includes(e.path)) { //power(1)表示管理员权限全部挂载  判断权限列表是否包含当前路由 包含则挂载
            router.addRoute(e)
        }
    })
};
router.beforeEach(async(to, from, next) => {
    if (to.path !== '/login' && !localStorage.get('token')) { // 判断是否登录  非`login`页面无`token`的话跳转到登录页面
        next({ path: '/login' });
    } else {
        const stores = PublicStore() // pinia 状态管理
        if (to.path !== '/login' && stores.power.length === 0) { // 判断是否获取过权限
            let res = await stores.setPower() // 获取权限列表
            if (res) {
                getRoutesAuth(stores.power) // 根据权限列表挂载路由
                next({ path: to.fullPath }) // 跳转页面
            } else { // 获取权限失败返回到来源页面
                next({ path: from.path, query: { hasPower: 1 } })
            }
        } else if (router.hasRoute(to.name)) { // 判断路由是否存在
            next()
        } else { // 路由不存在 返回原页面
            next({ path: from.path, query: { hasPower: 1 } })
        }
    }
});
export default router;