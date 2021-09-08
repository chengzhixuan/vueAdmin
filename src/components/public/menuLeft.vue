<template>
    <div class="ContainerLeftMenu">
        <el-menu :collapse-transition="false" @select="openUrl" :unique-opened="true" :collapse="isCollapse" :default-active="active" background-color="rgb(66, 72, 90)" text-color="#615E5E">
            <el-submenu :index="item.router" v-for="item in menulist" :key="item.router">
                <template #title>
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item v-for="i in item.ch" :key="i.router" :index="i.router">{{ i.title }}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
import { getMenu } from '@/router';
import { mapGetters } from 'vuex';
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
        ...mapGetters({
            isCollapse: 'Public/getIsCollapse',
        }),
    },
    watch: {},
    mounted() {},
    methods: {
        openUrl(url) {
            this.$router.push(url).catch((data) => {
                console.log(data.name);
            });
        },
    },
};
</script>
