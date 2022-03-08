<template>
    <el-dialog title="子账号编辑" :close-on-click-modal="false" :before-close="setPowerclose" v-model="visible" append-to-body width="600px">
        <div class="SetPowerDialog" v-loading="loading" element-loading-spinner="el-icon-loading">
            <div class="AccountInfo">
                <div>
                    <span class="Font666 Require">用户名：</span>
                    <el-input size="mini" style="width: 250px" placeholder="输入真实姓名" v-model="userName"></el-input>
                </div>
                <div>
                    <span class="Font666 Require">账号：</span>
                    <el-input size="mini" style="width: 250px" placeholder="输入账号" v-model="accountName"></el-input>
                </div>
                <div v-if="item.userId === undefined">
                    <span class="Font666 Require">登录密码：</span>
                    <el-input size="mini" style="width: 250px" placeholder="数字,英文,字符中的两种以上，长度6-20" v-model="userpass"></el-input>
                </div>
                <div>
                    <span class="Font666">手机号：</span>
                    <el-input size="mini" style="width: 250px" placeholder="输入手机号" v-model="phone"></el-input>
                </div>
                <div class="UserName">
                    <span class="Font666 Require">角色权限：</span>
                    <el-select style="width: 250px" @change="roleChange" size="mini" v-model="role" placeholder="请选择角色">
                        <el-option label="无" value></el-option>
                        <el-option v-for="i in Object.keys(power)" :key="i" :label="power[i].name" :value="i"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="OperatePower">
                <span class="Font666">权限明细：</span>
                <div class="HighSearchAddress scrollbarAuto">
                    <div>
                        <span class="HighSearchAddressCheck" v-for="(i, index) in mentList" :key="i.title">
                            <el-checkbox @change="(v) => menuChange(i, index, v)" size="mini" v-model="i.c"></el-checkbox>
                            <span @click="menuChange(i, index)" class="HighSearchAddressText">{{ i.title }}</span>
                        </span>
                        <div class="HighSearchAddressHandel">
                            <span @click="checkAll(1)" class="Pointer FontBlue">全选</span>
                            <span @click="reverse(1)" class="Pointer FontBlue">反选</span>
                            <span @click="emptys(1)" class="Pointer FontBlue">清空</span>
                        </div>
                    </div>
                    <div v-if="menu > -1 && mentList[menu].ch.length > 0">
                        <span class="HighSearchAddressNoPro" v-for="(i, index) in mentList[menu].ch" :key="i.title">
                            <el-checkbox @change="(v) => subChange(i, index, v)" size="mini" v-model="i.c"></el-checkbox>
                            <span @click="subChange(i, index)" class="HighSearchAddressText">{{ i.title }}</span>
                        </span>
                        <div class="HighSearchAddressHandel">
                            <span @click="checkAll(2)" class="Pointer FontBlue">全选</span>
                            <span @click="reverse(2)" class="Pointer FontBlue">反选</span>
                            <span @click="emptys(2)" class="Pointer FontBlue">清空</span>
                        </div>
                    </div>
                    <div v-if="menuSub > -1 && mentList[menu].ch[menuSub].ch && mentList[menu].ch[menuSub].ch.length > 0">
                        <span class="HighSearchAddressNoPro HighSearchAddressArea" v-for="(i, index) in mentList[menu].ch[menuSub].ch" :key="i.title">
                            <el-checkbox size="mini" @change="(v) => itemChange(i, index, v)" v-model="i.c">
                                <span class="HighSearchAddressText">{{ i.title }}</span>
                            </el-checkbox>
                        </span>
                        <div class="HighSearchAddressHandel">
                            <span @click="checkAll(3)" class="Pointer FontBlue">全选</span>
                            <span @click="reverse(3)" class="Pointer FontBlue">反选</span>
                            <span @click="emptys(3)" class="Pointer FontBlue">清空</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template #footer>
            <el-button type="primary" class="self-btn-32" @click="save" :disabled="loading">保存</el-button>
        </template>
    </el-dialog>
</template>

<script>
import api from '@/api'
import lodash from 'lodash'
import { PublicStore } from '@/store/Public'
import { ElMessage } from 'element-plus'
import { ref, watch, computed, toRefs } from 'vue'
const POWER = {
    be: { name: '后端', powerList: ['/', '/teamAdmin/project', '/teamAdmin/faultUpload'] },
    fe: { name: '前端', powerList: ['/', '/teamAdmin/project', '/teamAdmin/faultUpload'] },
    pm: { name: '产品', powerList: ['/', '/teamAdmin/project', '/teamAdmin/faultUpload', '/statistics/ideaFeedback', '/operManagement/updateLog', '/operManagement/advertSet', '/operManagement/adSet', '/operManagement/sysAccount', '/operManagement/nullActive', '/operManagement/advertSet', '/configure/courseClassSet', '/configure/hotWords', '/sms/tempExamine', '/sms/signExamine', '/sms/recharge', '/sms/systemTemp', '/sms/sensitiveWords'] },
    kf: { name: '客服', powerList: ['/', '/statistics/stayData', '/statistics/ideaFeedback', '/sms/tempExamine', '/sms/signExamine', '/sms/systemTemp', '/sms/sensitiveWords'] },
    ceo: { name: '首席执行官', powerList: [] },
    ui: { name: 'UI', powerList: ['/'] },
    om: { name: '运营', powerList: ['/', '/teamAdmin/project', '/teamAdmin/faultUpload', '/statistics/ideaFeedback', '/operManagement/updateLog', '/operManagement/advertSet', '/operManagement/adSet', '/operManagement/sysAccount', '/operManagement/nullActive', '/operManagement/advertSet', '/configure/courseClassSet', '/configure/hotWords', '/sms/tempExamine', '/sms/signExamine', '/sms/recharge', '/sms/systemTemp', '/sms/sensitiveWords'] },
}
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => { }
        },
    },
    emits: { getUserList: null, 'update:visible': null },
    setup(props, context) {
        const store = PublicStore()
        const { visible, item } = toRefs(props)
        const userMsg = computed(() => {
            return store.getUserMsg
        })
        let power = ref(POWER);
        let accountName = ref('');//账号名称
        let userName = ref('');//真实名称
        let phone = ref('');//登录账号
        let userpass = ref('');//登录密码
        let role = ref('');
        let mentList = ref([]);
        let menu = ref(-1);
        let menuSub = ref(-1);
        let loading = ref(false)
        watch(visible, (newValue, oldValue) => {
            if (newValue) {
                accountName.value = ''
                userName.value = ''
                phone.value = ''
                userpass.value = ''
                role.value = ''
                init()
            }
        })
        const roleChange = () => {
            let roule = power.value[role.value].powerList
            mentList.value.forEach(i => { // 设置已经添加的权限
                let mentCheck = false
                if (i.ch.length > 0) {
                    i.ch.forEach(x => {
                        x.c = roule.includes(x.router)
                        if (x.c) {
                            mentCheck = x.c
                        }
                    })
                } else {
                    mentCheck = !roule.includes(i.router)
                }
                i.c = mentCheck
            })
        }
        const init = () => {
            role.value = item.value.department ?? '';
            accountName.value = item.value.username ?? '';
            userName.value = item.value.realname ?? '';
            phone.value = item.value.mobilenum ?? '';
            userpass.value = '';
            let authList = JSON.parse(item.value.authList || '[]')
            let a = lodash.cloneDeep(store.leftMenu)
            a.forEach(i => { // 设置已经添加的权限
                if (i.title === '教程中心') {
                    i.ch.push({ router: '/addCourse', title: '文章编辑' },)
                }
                let mentCheck = false
                if (i.ch && i.ch.length > 0) {
                    i.ch.forEach(x => {
                        if (authList.includes(x.router)) {
                            mentCheck = true
                            x.c = true
                        }
                    })
                } else {
                    mentCheck = authList.includes(i.router)
                }
                i.c = mentCheck
            })
            mentList.value = a
        }
        const setPowerclose = () => {
            context.emit('update:visible', false);
        }
        const itemChange = (item, index, v) => {
            mentList.value[menu.value].ch[menuSub.value].ch
            if (v) {
                mentList.value[menu.value].c = true
                mentList.value[menu.value].ch[menuSub.value].c = true
            } else {
                let hasCheck = false
                mentList.value[menu.value].ch[menuSub.value].ch.forEach(i => {
                    if (i.c) {
                        hasCheck = true
                    }
                })
                mentList.value[menu.value].ch[menuSub.value].c = hasCheck
                hasCheck = false
                mentList.value[menu.value].ch.forEach(i => {
                    if (i.c) {
                        hasCheck = true
                    }
                })
                mentList.value[menu.value].c = hasCheck
            }
        }
        const menuChange = (item, index, v) => {
            if (v !== undefined) {
                mentList.value[index].ch.forEach(i => {
                    i.c = v
                    i.ch?.forEach(a => {
                        a.c = v
                    })
                })
            }
            menu.value = index
            menuSub.value = -1
        }
        const subChange = (item, index, v) => {
            if (v !== undefined) {
                let hasCheck = false
                if (v) {
                    hasCheck = true
                } else {
                    mentList.value[menu.value].ch.forEach(i => {
                        if (i.c) {
                            hasCheck = true
                        }
                    })
                }
                mentList.value[menu.value].c = hasCheck
                mentList.value[menu.value].ch[index].ch?.forEach(i => {
                    i.c = v
                })
            }
            menuSub.value = index
        }
        const checkAll = (v) => {
            switch (v) {
                case 1:
                    mentList.value.forEach(i => {
                        i.c = true
                        i.ch.forEach(x => {
                            x.c = true
                        })
                    })
                    break
                case 2:
                    mentList.value[menu.value].ch.forEach(i => {
                        i.c = true
                    })
                    break
            }
        }
        const reverse = (v) => {
            switch (v) {
                case 1:
                    mentList.value.forEach(i => {
                        i.c = !i.c
                        i.ch.forEach(x => {
                            x.c = i.c
                        })
                    })
                    break
                case 2:
                    mentList.value[menu.value].ch.forEach(i => {
                        i.c = !i.c
                    })
                    break
            }
        }
        const emptys = (v) => {
            switch (v) {
                case 1:
                    mentList.value.forEach(i => {
                        i.c = false
                        i.ch.forEach(x => {
                            x.c = false
                        })
                    })
                    break
                case 2:
                    mentList.value[menu.value].ch.forEach(i => {
                        i.c = false
                    })
                    break
            }
        }
        //权限修改保存
        const save = () => {
            if (userName.value === '') {
                ElMessage({ message: '请输入真实姓名', type: 'error', offset: 300 })
                return
            }
            if (accountName.value === '') {
                ElMessage({ message: '请输入账号', type: 'error', offset: 300 })
                return
            }
            if (item.value.userId === undefined) {
                let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
                if (!reg.test(userpass.value)) {
                    ElMessage({ message: '密码请至少输入6位以上，需包含数字和英文', type: 'error', offset: 300 })
                    return
                }
            }
            if (role.value === '') {
                ElMessage({ message: '请选择角色', type: 'error', offset: 300 })
                return
            }
            loading.value = true;
            let list = []
            mentList.value.forEach(i => {
                if (i.c) {
                    if (i.ch.length > 0) {
                        i.ch.forEach(x => {
                            if (x.c) {
                                list.push(x.router)
                            }
                        })
                    } else {
                        list.push(i.path || i.router || i.href)
                    }
                }
            })
            list = [...new Set(list)].filter(x => !!x);
            if (role.value === 'ceo') {
                list = ''
            } else {
                list = JSON.stringify(list)
            }
            if (item.value.userId) {
                api.Public.updateUser(item.value.userId, accountName.value, userName.value, phone.value, role.value, list).then(res => {
                    if (res === 1) {
                        ElMessage({ message: '保存成功', type: 'success', offset: 300 })
                        setTimeout(() => {
                            window.window.location.reload()
                        }, 300)
                    } else {
                        ElMessage({ message: `保存失败: ${res.message}`, type: 'error', offset: 300 })
                    }
                    loading.value = false;
                }).catch(err => {
                    loading.value = false;
                    ElMessage({ message: `保存失败`, type: 'error', offset: 300 })
                    console.log(err)
                })
            } else {
                api.Public.addUser(accountName.value, userpass.value, userName.value, phone.value, list, role.value).then(res => {
                    if (res === 1) {
                        ElMessage({ message: '保存成功', type: 'success', offset: 300 })
                        setTimeout(() => {
                            window.window.location.reload()
                        }, 300)
                    } else {
                        ElMessage({ message: `保存失败: ${res.message}`, type: 'error', offset: 300 })
                    }
                    loading.value = false;
                }).catch(err => {
                    loading.value = false;
                    ElMessage({ message: `保存失败`, type: 'error', offset: 300 })
                    console.log(err)
                })
            }

        }
        return {
            userMsg, accountName, power, userName, phone, userpass, role, mentList, menu, menuSub, loading,
            roleChange, init, setPowerclose, itemChange, menuChange, subChange, checkAll, reverse, emptys, save
        }
    },
}
</script>
<style lang="less" scoped>
.SetPowerDialog {
    box-sizing: border-box;
    font-size: 12px;
    .UserName {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        & > span:first-child {
            width: 80px;
            text-align: right;
        }
    }
    .AccountInfo {
        & > div {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            & > span:first-child {
                width: 80px;
                text-align: right;
            }
        }
        .Require {
            &::before {
                content: "*";
                position: absolute;
                font-size: 16px;
                margin-left: 3px;
                color: #da4f4a;
                left: 20px;
            }
        }
    }
    .OperatePower {
        display: flex;
        & > span:first-child {
            width: 80px;
            text-align: right;
            flex-shrink: 0;
            margin-top: 5px;
        }
        .HighSearchAddress {
            border: 1px solid rgba(243, 243, 243, 1);
            flex-grow: 1;
            max-height: 280px;
            overflow-y: auto;
            & > div {
                display: flex;
                flex-flow: row wrap;
                padding: 10px 0px 5px;
                border-bottom: 1px solid #f3f3f3;
            }
            .HighSearchAddressCheck {
                padding-left: 5px;
                width: 70px;
                flex-shrink: 0;
            }
            .HighSearchAddressNoPro {
                padding-left: 5px;
                flex-shrink: 0;
                margin-right: 10px;
            }
            .HighSearchAddressText {
                margin-left: 3px;
                cursor: pointer;
                &:hover {
                    color: #1799ff;
                }
            }
            .HighSearchAddressArea {
                /deep/.el-checkbox__label {
                    padding-left: 0px;
                }
            }
            .HighSearchAddressHandel {
                display: flex;
                justify-content: flex-end;
                width: 100%;
                margin-top: 10px;
                span {
                    margin-right: 10px;
                    margin-left: 8px;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
/deep/.el-dialog__body {
    padding: 0px 20px 20px;
}
/deep/.el-dialog__footer {
    background-color: #fff;
}
/deep/.el-loading-spinner i {
    color: #818181;
    font-size: 20px;
}
</style>