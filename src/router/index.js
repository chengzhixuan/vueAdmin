import { createRouter, createWebHashHistory } from 'vue-router';
import publics from './public';
import adminSet from './adminSet';
import localStorage from 'store';
import { cloneDeep } from '@/util';
const routesList = [...publics, ...adminSet];
let userMsg = localStorage.get('userMsg');
let authMenu = userMsg && userMsg.authList.length > 0 ? userMsg.authList : 1;
// 需要授权的路由中已经授权过的页面   获取路由的时候判断下路由权限是否修改  修改后重新加载
const getRoutesAuth = () => {
    return routesList.filter((i) => {
        // 返回管理员或者授权过的路由
        if (authMenu === 1 || authMenu.includes(i.path)) {
            return true;
        } else {
            return false;
        }
    });
};
const noAuthRoutes = routesList.filter((i) => {
    return i.meta ? i.meta.noAauth : false;
});
const routes = noAuthRoutes.concat(getRoutesAuth());
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !localStorage.get('token')) {
        next({ path: '/login' });
    } else {
        if (to.name) {
            next()
        } else {
            next({ path: from.path, query: { hasPower: 1 } })
        }
    }
});
let menuList = [
    //左边菜单编辑
    {
        router: '/',
        title: '首页',
        icon: 'iconzhanghao',
        ch: []
    }, {
        title: '用户管理',
        router: '/adminSet',
        icon: 'iconzizhanghaoguanli',
        ch: [{ router: '/adminSet/accountSet', title: '权限配置' }],
    }, {
        title: '系统设置',
        router: '/setting',
        icon: 'iconshezhi',
        ch: [],
    },
];
// 获取菜单
let getMenu = () => {
    let list = cloneDeep(menuList);
    if (authMenu === undefined || authMenu === 1) {
        // 超级管理员返回全部路由
        return list;
    }
    list.forEach((i) => {
        // 设置已经添加的权限
        if (i.ch.length > 0) {
            i.ch = i.ch.filter((y) => {
                return authMenu.includes(y.router) || y.noAauth;
            });
            if (i.ch.length === 0) {
                delete i.ch;
            }
        } else {
            delete i.ch;
        }
    });
    return list.filter((i) => {
        return !!i.ch;
    });
};
export { getMenu, getRoutesAuth };
export default router;