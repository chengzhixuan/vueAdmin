<template>
    <div class="LoginPage">
        <div class="LoginEchart"></div>
        <div class="CarouselLogRightShare">
            <div class="CarouselLogRightHeader FlexRow">
                <span class="Font666" :class="{ FontBlue: active === 1 }" @click="active = 1">手机号登入</span>
                <span class="Font666" :class="{ FontBlue: active === 2 }" @click="active = 2">密码登录</span>
            </div>
            <div v-if="active === 2" class="ShareLogItem">
                <el-input style="width: 290px" v-model="subMobile" placeholder="请输入登录账号">
                    <template #prefix>
                        <div class="FlexRow FlexCenter">
                            <el-icon class="iconzhanghao2 iconfont"></el-icon>
                        </div>
                    </template>
                </el-input>
            </div>
            <div v-if="active === 2" class="ShareLogItem LoginPassword">
                <el-input :type="showPwd ? 'text' : 'password'" style="width: 290px" v-model="password" placeholder="请输入登录密码">
                    <template #prefix>
                        <div class="FlexRow FlexCenter">
                            <el-icon class="iconmima iconfont"></el-icon>
                        </div>
                    </template>
                </el-input>
                <i @click="showPwd = !showPwd" v-if="password.length > 0" class="iconfont" :class="showPwd ? 'iconbianzu4' : 'iconkejian'"></i>
            </div>
            <div v-if="active === 2" class="ShareLogItem">
                <el-input v-model="rand" style="width: 190px" placeholder="请输入验证码">
                    <template #prefix>
                        <div class="FlexRow FlexCenter">
                            <el-icon class="iconyanzhengma iconfont"></el-icon>
                        </div>
                    </template>
                </el-input>
                <img @click="refreshIdentifyingCode" class="Pointer VerifCode" src="../../assets/image/logo.png" alt="验证码" />
            </div>
            <div v-if="active === 1" class="ShareLogItem">
                <el-input style="width: 290px" v-model="phone" placeholder="手机号码">
                    <template #prefix>
                        <div class="FlexRow FlexCenter">
                            <el-icon class="icondianhua iconfont"></el-icon>
                        </div>
                    </template>
                </el-input>
            </div>
            <div v-if="active === 1" class="ShareLogItem" style="margin-bottom: 20px">
                <el-input style="width: 290px" v-model="verifCode" placeholder="验证码">
                    <template #prefix>
                        <div class="FlexRow FlexCenter">
                            <el-icon class="iconyanzhengma iconfont"></el-icon>
                        </div>
                    </template>
                </el-input>
                <span v-if="sendVerTime === 60" @click="sendVerif" class="FontBlue Pointer SendVerif">发送验证码</span>
                <span v-else class="FontGray Pointer SendVerif">{{ sendVerTime }}s重新发送</span>
            </div>
            <span @click="login" class="LoginBtn FlexRow">登录</span>
            <span class="FontBlue Pointer LogonBtn">还没有账号？立即注册</span>
        </div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import axios from '@/api/axios'
import 'echarts-gl';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { PublicStore } from '@/store/Public';
import api from '@/api'
let publicStore = PublicStore()
let router = useRouter()
let active = ref(1);
let subMobile = ref('');
let password = ref('');
let showPwd = ref(false);
let rand = ref('');
let phone = ref('1526568465');
let verifCode = ref('23423');
let sendVerTime = ref(60);
let sendVer = ref(null);
onMounted(() => {
    setTimeout(() => {
        // init();
    }, 100);
})
const init = () => {
    let ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
    let chartDom = document.querySelector('.LoginEchart');
    let myChart = echarts.init(chartDom);
    let option = {
        backgroundColor: '#000',
        globe: {
            baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
            heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
            displacementScale: 0.04,
            shading: 'realistic',
            environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
            realisticMaterial: {
                roughness: 0.9,
            },
            postEffect: {
                enable: true,
            },
            light: {
                main: {
                    intensity: 5,
                    shadow: true,
                },
                ambientCubemap: {
                    texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                    diffuseIntensity: 0.2,
                }
            }
        }
    };
    option && myChart.setOption(option);
}
const sendVerif = () => {
    if (regPhone(phone.value)) {
        sendVer.value = setInterval(() => {
            sendVerTime.value -= 1;
            if (sendVerTime.value === 0) {
                clearInterval(sendVer.value)
                sendVerTime.value = 60
            }
        }, 1000);
    } else {
        ElMessage({ type: 'error', message: '手机格式不匹配' })
    }
}
const regPhone = (phone) => {
    // 正则手机号匹配
    let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    return reg.test(phone);
}
const login = async () => {
    if (active.value === 1) { // 手机号登录
        let res = await api.BaseApi.login(phone.value, verifCode.value)
        if (res.code === 200) {
            publicStore.setUserMsg(res.data)
            axios.defaults.headers.common['token'] = res.data.token;
            router.push('/')
        } else {
            ElMessage({ type: 'error', message: res.message ? res.message : res })
        }
    } else { // 密码登录

    }
}
const refreshIdentifyingCode = (v) => {
    v.target.src = '/test/authImg?v=' + Math.random();
}
</script>
<style lang="less" scoped>
.LoginPage {
    height: 100%;
    width: 100%;
    padding: 0px;
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    .LoginEchart {
        position: absolute;
        top: 0px;
        left: 0px;
        background: #000;
        width: 100%;
        flex-grow: 1;
        height: 100%;
    }
}
.CarouselLogRightShare {
    width: 372px;
    background: #ffffff;
    border-radius: 10px;
    z-index: 10;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: auto;
    box-shadow: 0 -1px 27px 0 rgb(158 168 179 / 33%),
        0 2px 4px 0 rgb(158 168 179 / 33%), 0 14px 35px 0 rgb(158 168 179 / 52%);
    .CarouselLogRightHeader {
        padding: 20px 0px;
        span {
            padding: 10px 25px;
            position: relative;
            font-size: 16px;
            cursor: pointer;
            &:hover {
                color: #297aff;
            }
        }
    }
    .ShareLogItem {
        width: 290px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        position: relative;
    }
    .iconbianzu4,
    .iconkejian {
        position: absolute;
        color: #c0c4cc;
        right: 10px;
        top: 10px;
        cursor: pointer;
        &:hover {
            color: #297aff;
        }
    }
    .SendVerif {
        position: absolute;
        right: 0px;
        top: 10px;
        padding: 3px 10px;
    }
    .el-input {
        /deep/.el-input__inner {
            height: 42px;
            line-height: 42px;
            border-radius: 2px;
        }
        /deep/.el-input__icon {
            line-height: 42px;
        }
        &:hover {
            /deep/.el-input__inner {
                border-color: #297aff;
            }
            /deep/.iconfont {
                color: #333;
            }
        }
    }
    .VerifCode {
        width: 74px;
        height: 40px;
        margin-left: 15px;
    }
    .LoginBtn {
        font-size: 16px;
        width: 290px;
        height: 42px;
        background: #4a8fff;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        margin-top: 12px;
        &:hover {
            background: rgba(74, 143, 255, 0.8);
        }
    }
    .LogonBtn {
        align-self: flex-start;
        margin: 10px 0px 20px 40px;
    }
}
</style>