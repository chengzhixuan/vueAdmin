import localStorage from 'store'
import { defineStore } from 'pinia'
import api from '@/api'
import { cloneDeep } from '@/util';
//定义左边菜单列表 `noAauth`true表示无需权限控制
let menuList = [
    { router: '/', title: '首页', noAauth: true, icon: 'iconzhanghao', ch: [] },
    { router: '/adminSet', title: '用户管理', icon: 'iconzizhanghaoguanli', ch: [{ router: '/adminSet/accountSet', title: '权限配置' }] },
    { router: '/echart', title: '表格插件', icon: 'iconbiaoge', ch: [] },
    { router: '/setting', title: '系统设置', icon: 'iconshezhi', ch: [] }
];
export const PublicStore = defineStore('Public', {
    state: () => {
        return {
            isCollapse: localStorage.get('isCollapse') === undefined ? false : localStorage.get('isCollapse'),
            userMsg: localStorage.get('userMsg') ? localStorage.get('userMsg') : {},
            power: [],
            leftMenu: []
        }
    },
    getters: {
        getUserMsg: (state) => {
            return state.userMsg
        },
        getIsCollapse() {
            return this.isCollapse
        },
        getPower: (state) => {
            return state.power
        },
        getMenu() {
            return this.leftMenu
        }
    },
    actions: {
        setIsCollapse(isCollapse) {
            this.isCollapse = isCollapse
            localStorage.set('isCollapse', isCollapse);
        },
        setUserMsg(userMsg) {
            localStorage.set('userMsg', userMsg)
            localStorage.set('token', userMsg.token)
            this.userMsg = userMsg
        },
        async setPower() {
            let res = await api.BaseApi.getPower() // 获取权限
            if (res.code === 200) {
                this.power = res.data.length === 0 ? 1 : res.data // 权限列表返回为空表示拥有全部权限
                this.setLeftMenu()
                return true
            } else {
                return false
            }
        },
        setLeftMenu() { // 左边菜单栏
            let list = cloneDeep(menuList); // 深拷贝一份  防止不刷新时 权限改变后重新登入有问题
            if (this.power === 1) { // 超级管理员返回全部路由
                this.leftMenu = list;
            } else {
                // 设置已经添加的权限  `noAauth`true 表示无需进行权限控制
                list.forEach((i) => {
                    if (i.ch.length > 0) {
                        i.ch = i.ch.filter((y) => {
                            return this.power.includes(y.router) || y.noAauth; // 返回不需要权限控制和授予过权限的菜单
                        });
                        if (i.ch.length === 0) { // 如果子菜单为空 一级菜单置空
                            i.router = undefined
                        }
                    } else {
                        if (!this.power.includes(i.router) && !i.noAauth) { // 需要进行权限控制的未授权页面 
                            i.router = undefined // 一级菜单置空
                        }
                    }
                });
                this.leftMenu = list.filter((i) => { // 过滤掉没有权限的一级菜单
                    return !!i.router;
                });
            }

        }
    }
})