<template>
    <div class="ContainerLeftMenu">
        <el-menu :collapse-transition="false" @select="openUrl" :unique-opened="true" :collapse="isCollapse" :default-active="active" background-color="rgb(66, 72, 90)" text-color="#615E5E">
            <template v-for="item in menulist" :key="item.router">
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
<script>
import { getMenu } from '@/router';
import { PublicStore } from '@/store/Public'
import { mapState } from 'pinia'
import { ref } from 'vue';
export default {
    setup() {
        let menulist = ref(getMenu());
        return {
            menulist,
        };
    },
    props: {
        active: {
            type: String,
            default: '/',
        },
    },
    computed: {
        ...mapState(PublicStore, {
            isCollapse: 'getIsCollapse',
        }),
    },
    watch: {},
    mounted() { },
    methods: {
        openUrl(url) {
            this.$router.push(url).catch((data) => {
                console.log(data.name);
            });
        },
    },
};
</script>
