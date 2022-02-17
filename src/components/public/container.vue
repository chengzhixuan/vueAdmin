<template>
    <el-container class="Container">
        <el-header class="ContainerHeader" height="50px">
            <img class="ContainerHeaderLogo" @click="$router.push('/')" src="../../assets/image/logo.png" />
            <div class="ContainerHeaderNick">
                <div class="ContainerHeaderName">
                    <span class="ListaliasName CopyText" :data-clipboard-text="userMsg.userName">{{ userMsg.userName }}</span>
                    <span @click="signOut" class="ContainerHeaderShopChange FlexRow">退出</span>
                </div>
            </div>
        </el-header>
        <el-container class="ContainerBody">
            <el-aside class="ContainerLeft scrollbarAuto" :width="isCollapse ? '64px' : '150px'">
                <div class="isCollapse Pointer" @click="isCollapseChange()">
                    <i :class="isCollapse ? 'iconfold' : 'iconunfold'" class="iconfont"></i>
                </div>
                <MenuLeft :active="menuLeft" />
            </el-aside>
            <slot name="main"></slot>
        </el-container>
        <slot></slot>
    </el-container>
</template>
<script>
import localStorage from 'store';
import { PublicStore } from '@/store/Public'
import { mapState } from 'pinia'
export default {
    data() {
        return {};
    },
    props: {
        menuLeft: {
            type: String,
            default: '',
        },
        isShowLeft: {
            // 控制侧边栏的有无
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapState(PublicStore, ['getIsCollapse', 'getUserMsg']),
        ...mapState(PublicStore, {
            isCollapse: 'getIsCollapse',
            userMsg: store => store.userMsg,
        }),
    },
    created() { },
    methods: {
        signOut() {
            localStorage.clearAll();
            this.$router.push('/login');
        },
        isCollapseChange() {
            this.$store.dispatch('Public/isCollapse', !this.isCollapse);
        },
    },
};
</script>
<style lang="less" scoped>
.Container {
    height: 100%;
    min-width: 1440px;
    flex-flow: column nowrap;
    justify-content: flex-start;
}
.ContainerBody {
    min-height: 500px;
    flex-grow: 1;
    height: 100%;
}
.ContainerHeader {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    background-color: #2a2a2d;
    padding: 0px 10px 0px 20px;
    z-index: 2001;
    .ContainerHeaderLogo {
        cursor: pointer;
        width: 108px;
        height: 30px;
    }
    .ContainerHeaderNick {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 14px;
        height: 100%;
        .ContainerHeaderName {
            display: flex;
            align-items: center;
            margin: 0 5px;
            padding: 0px 3px 0px 7px;
            background: #fff;
            border-radius: 17px;
            cursor: pointer;
            .ListaliasName {
                display: inline-block;
                width: 105px;
                font-size: 12px;
                padding: 7px 0px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                color: #333;
            }
            .ContainerHeaderShopChange {
                width: 35px;
                height: 22px;
                background: #d3efff;
                border-radius: 11px;
                font-size: 12px;
                align-items: center;
                justify-content: center;
                color: #fff !important;
                background: #409eff;
            }
        }
    }
}
.ContainerLeft {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
    background: #2a2a2d;
    .isCollapse {
        display: flex;
        background: #393939;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        height: 30px;
        flex-shrink: 0;
        i {
            font-size: 12px;
            color: #aeb9c2;
        }
    }
}
</style>
<style lang="less">
.el-menu--vertical {
    .el-menu--popup-right-start {
        background: #2a2a2d !important;
    }
    .el-menu-item,
    .el-sub-menu__title {
        height: 40px;
        line-height: 40px;
        color: #fff !important;
        background: #2a2a2d !important;
        font-size: 12px;
        font-weight: 400;
        &:hover {
            background: #1c1c1c !important;
        }
    }
    .el-menu-item.is-active {
        color: #fff;
        background: #1799ff !important;
    }
}
.ContainerLeftMenu {
    flex-grow: 1;
    background-color: #2a2a2d;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    & > .el-menu--collapse.el-menu {
        .iconfont {
            margin-left: 3px;
        }
    }
    & > .el-menu {
        border-right: 0px;
        width: 100%;
        .iconfont {
            margin-right: 10px;
            margin-left: 10px;
            width: 24px;
            color: #fff;
            -webkit-font-smoothing: antialiased;
            font-size: 16px;
        }
        .el-sub-menu__icon-arrow {
            top: 53%;
            color: #fff;
        }
        .el-icon-arrow-down:before {
            content: "\e790";
        }
        .el-sub-menu .el-sub-menu__title {
            height: 40px;
            line-height: 40px;
            padding-left: 5px !important;
            color: #fff !important;
            font-size: 12px;
            -webkit-font-smoothing: antialiased;
            &:hover {
                background-color: rgb(66, 72, 90) !important;
            }
        }
        & > .el-menu-item {
            height: 40px;
            line-height: 40px;
            color: #fff !important;
            font-size: 12px;
            padding-left: 5px !important;
            &:hover {
                background-color: rgb(66, 72, 90) !important;
            }
            &.is-active .icondianpu_,
            &.is-active .icondaochufffpx {
                color: #fff !important;
            }
        }
        .el-menu--inline {
            .el-menu-item {
                padding-left: 50px !important;
                &:hover {
                    background-color: #1c1c1c !important;
                }
            }
        }
        .el-sub-menu .el-menu-item {
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #fff !important;
            background: #2a2a2d !important;
            -webkit-font-smoothing: antialiased;
            position: relative;
            &:hover {
                background: #1c1c1c !important;
            }
        }
        .el-sub-menu.is-opened ul li.el-menu-item.is-active,
        .el-menu-item.is-active {
            color: #fff !important;
            background: #409eff !important;
            font-weight: 400;
        }
    }
    .el-menu--collapse {
        .el-sub-menu .el-sub-menu__title {
            padding-left: 20px !important;
        }
    }
}
</style>
