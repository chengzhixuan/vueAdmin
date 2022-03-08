<template>
    <div class="ContainerLeftMenu">
        <el-menu :collapse-transition="false" @select="openUrl" :unique-opened="true" :collapse="isCollapse" :default-active="active" background-color="rgb(66, 72, 90)" text-color="#615E5E">
            <template v-for="item in leftMenu" :key="item.router">
                <el-sub-menu v-if="item.ch && item.ch.length > 0" :index="item.router">
                    <template #title>
                        <i class="iconfont" :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="i in item.ch" :key="i.router" :index="i.router">{{ i.title }}</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.router">
                    <i class="iconfont" :class="item.icon"></i>
                    <template #title>{{ item.title }}</template>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script setup>
import { PublicStore } from '@/store/Public'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
defineProps({
    active: {
        type: String,
        default: '/',
    }
})
const router = useRouter()
const { isCollapse, leftMenu } = storeToRefs(PublicStore())

const openUrl = (url) => {
    router.push(url).catch((data) => {
        console.log(data.name);
    });
}
</script>
