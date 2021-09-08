import { createRouter, createWebHashHistory } from 'vue-router';
import publics from './public';
import localStorage from 'store';
import { cloneDeep } from '@/util';
const routesList = [...publics];
let userMsg = localStorage.get('userMsg');
let authMenu = userMsg && userMsg.rights ? JSON.parse(userMsg.rights) : 1;
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
        next();
    }
});
let menuList = [
    //左边菜单编辑
    {
        router: '/',
        title: '教程中心',
        icon: 'iconwenzhang',
        ch: [{ router: '/', title: '文章' }],
    },
    {
        title: '反馈中心',
        router: '/statistics',
        icon: 'iconzixun',
        ch: [
            { router: '/statistics/stayData', title: '表单留资列表' },
            { router: '/statistics/ideaFeedback', title: '意见反馈' },
        ],
    },
    {
        title: '运营管理',
        router: '/operManagement',
        icon: 'iconshezhi',
        ch: [
            { router: '/operManagement/updateLog', title: '更新日志' },
            { router: '/operManagement/advertSet', title: '通用广告位配置' },
            { router: '/operManagement/adSet', title: '圈送人群配置' },
            { router: '/operManagement/sysAccount', title: '系统公告' },
            { router: '/operManagement/nullActive', title: '空白页引导' },
            { router: '/operManagement/advertSet', title: '通用广告位配置' },
        ],
    },
    {
        title: '团队管理',
        router: '/teamAdmin',
        icon: 'iconshezhi',
        ch: [
            { router: '/teamAdmin/project', title: '项目管理' },
            { router: '/teamAdmin/faultUpload', title: '故障上报' },
        ],
    },
    {
        title: '基础配置',
        router: '/configure',
        icon: 'iconshezhi',
        ch: [
            { router: '/configure/courseClassSet', title: '教程类目配置' },
            { router: '/configure/hotWords', title: '搜索热词配置' },
        ],
    },
    {
        title: '用户管理',
        router: '/adminSet',
        icon: 'iconshezhi',
        ch: [{ router: '/adminSet/accountSet', title: '权限配置' }],
    },
    {
        title: '短信业务',
        router: '/sms',
        icon: 'iconshezhi',
        ch: [
            { router: '/sms/tempExamine', title: '模板审核' },
            { router: '/sms/signExamine', title: '签名审核' },
            { router: '/sms/recharge', title: '充值记录' },
            { router: '/sms/systemTemp', title: '系统模板' },
            { router: '/sms/sensitiveWords', title: '敏感词' },
        ],
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
