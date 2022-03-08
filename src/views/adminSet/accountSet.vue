<template>
    <Container menuLeft="/adminSet/accountSet">
        <template v-slot:main>
            <el-main class="RouterPage AccountSetPage">
                <div class="FlexRow AccountSet">
                    <el-button @click="setPower()" class="self-btn-28" type="primary">
                        <i class="iconadd3 iconfont"></i>
                        添加账号
                    </el-button>
                </div>
                <div class="RouterPageTable">
                    <el-table height="100%" empty-text="暂无数据" :header-cell-style="{ background: '#ECF5FF', 'font-weight': '400', color: '#333333' }" size="mini" :data="tableData" v-loading="loading" element-loading-spinner="el-icon-loading">
                        <el-table-column show-overflow-tooltip align="center" prop="realname" label="姓名" width="120"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="mobilenum" label="手机号" width="120"></el-table-column>
                        <el-table-column show-overflow-tooltip align="center" prop="userText" label="角色" width="120"></el-table-column>
                        <el-table-column label="权限名称">
                            <template v-slot="scope">
                                <span>{{ formatPower(scope.row.rights) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" width="200px">
                            <template v-slot="scope">
                                <span class="FontBlue RouterPageTableHandle Pointer" @click="setPower(scope.row)">设置权限</span>
                                <span class="FontRed Pointer" @click="delAccount(scope.row.username)">删除账号</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </template>
        <SetPower v-model:visible="setPowerVisible" :item="item" @getUserList="getUserList" />
    </Container>
</template>
<script>
import { SetPower } from "./components"
import api from '@/api'
import { PublicStore } from '@/store/Public'
import { ref, reactive, onMounted, computed } from 'vue'
import lodash from 'lodash'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    setup() {
        const store = PublicStore()
        let setPowerVisible = ref(false);
        let loading = ref(false);
        let getMenuList = ref([]);
        let tableData = ref([]);
        let item = reactive({})
        const userMsg = computed(() => {
            return store.getUserMsg
        })
        onMounted(() => {
            // init()
        })
        const getUserList = () => {//获取账号列表
            loading.value = false;
            tableData.value = [];
            api.Public.getUserList().then(res => {
                if (res.success) {
                    res.data.list.forEach(e => {
                        switch (e.department) {
                            case 'be':
                                e.userText = '后端'
                                break
                            case 'fe':
                                e.userText = '前端'
                                break
                            case 'pm':
                                e.userText = '产品'
                                break
                            case 'kf':
                                e.userText = '客服'
                                break
                            case 'ceo':
                                e.userText = '首席执行官'
                                break
                            case 'ui':
                                e.userText = 'UI'
                                break
                            case 'om':
                                e.userText = '运营'
                                break
                        }
                    })
                    tableData.value = res.data.list;
                }
                loading.value = false;
            }).catch(err => {
                loading.value = false;
                console.log(err);
            })
        }
        const formatPower = (rights) => {
            rights = JSON.parse(rights || '[]')
            let list = []
            getMenuList.value.forEach(i => { // 设置已经添加的权限
                let mentCheck = false
                if (i.ch.length > 0) {
                    i.ch.forEach(x => {
                        if (rights.includes(x.router)) {
                            mentCheck = true
                        }
                    })
                } else {
                    mentCheck = rights.includes(i.router)
                }
                mentCheck ? list.push(i.title) : ''
            })
            return list.join(',')
        }
        const init = () => {//查询
            getUserList();
            getMenuList.value = lodash.cloneDeep(store.leftMenu);
        }
        const setPower = (v = {}) => {//设置权限
            Object.assign(item, v)
            setPowerVisible.value = true;
        }
        const delAccount = (v) => {//删除账号
            ElMessageBox.confirm('此操作将删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.Public.delUser(v).then(res => {
                    if (res === '1') {
                        ElMessage.success({ message: '删除成功!' });
                        getUserList()
                    } else {
                        ElMessage.error({ message: '删除失败!' });
                    }
                }).catch(err => {
                    console.log(err)
                })
            }).catch(() => { });
        }
        return {
            setPowerVisible,
            getMenuList,
            tableData,
            item,
            loading,
            getUserList,
            formatPower,
            init,
            setPower,
            delAccount
        }
    },
    components: {
        SetPower,
    }
}
</script>
<style lang="less" scoped>
.AccountSetPage {
    display: flex;
    flex-flow: column nowrap;
}
.AccountSet {
    padding: 10px 25px;
    justify-content: flex-end;
    .iconadd3 {
        font-size: 12px;
    }
}
.RouterPageTable {
    padding-bottom: 30px;
    flex-grow: 1;
}
</style>