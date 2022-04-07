<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { watch } from 'vue';
const route = useRoute();
watch(route, (to) => {
    if (to.query.hasPower === '1') {
        ElMessageBox.confirm(`<span>当前登录子账号无访问权限，请联系主店设置，</span><a style='margin:0px 30px 0px 5px' target='_blank' href='https://www.chuanmeidayin.com/article/1095' class='FontBlue Pointer' >如何设置</a>`, '提示', {
            confirmButtonText: '我知道了',
            cancelButtonText: '取消',
            showCancelButton: false,
            dangerouslyUseHTMLString: true,
            type: 'error',
        }).then(() => { }).catch(() => { });
    }
});
</script>
<style lang="less">
@import "./assets/styles/style.less";
@import "//at.alicdn.com/t/font_2824716_lzszyqiwhqe.css";
@import "./assets/styles/golbal.less";
.el-main.RouterPage {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    padding: 0px;
    flex-shrink: 1;
    flex-grow: 0;
    overflow-y: auto;
    max-height: 100%;
    width: 100%;
    background: #fff;
    &::-webkit-scrollbar {
        width: 0px;
    }
}
</style>

