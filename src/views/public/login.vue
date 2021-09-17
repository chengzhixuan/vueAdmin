<template>
    <div class="RouterPage LoginPage">
        <div class="LoginEchart"></div>
        <div class="CarouselLogRightShare">
            <div class="CarouselLogRightHeader FlexRow">
                <span class="Font666" :class="{ FontBlue: active === 1 }" @click="active = 1">手机号登入</span>
                <span class="Font666" :class="{ FontBlue: active === 2 }" @click="active = 2">密码登录</span>
            </div>
            <div v-if="active === 2" class="ShareLogItem">
                <el-input prefix-icon="iconzhanghao2 iconfont" style="width: 290px" v-model="subMobile" placeholder="请输入登录账号"></el-input>
            </div>
            <div v-if="active === 2" class="ShareLogItem LoginPassword">
                <el-input prefix-icon="iconmima iconfont" :type="showPwd ? 'text' : 'password'" style="width: 290px" v-model="password" placeholder="请输入登录密码"></el-input>
                <i @click="showPwd = !showPwd" v-if="password.length > 0" class="iconfont" :class="showPwd ? 'iconbianzu4' : 'iconkejian'"></i>
            </div>
            <div v-if="active === 2" class="ShareLogItem">
                <el-input prefix-icon="iconyanzhengma iconfont" v-model="rand" style="width: 190px" placeholder="请输入验证码"></el-input>
                <img @click="refreshIdentifyingCode" class="Pointer VerifCode" src="../../assets/image/logo.png" alt="验证码" />
            </div>
            <div v-if="active === 1" class="ShareLogItem">
                <el-input prefix-icon="icondianhua iconfont" style="width: 290px" v-model="phone" placeholder="手机号码"></el-input>
            </div>
            <div v-if="active === 1" class="ShareLogItem" style="margin-bottom: 20px">
                <el-input prefix-icon="iconyanzhengma iconfont" style="width: 290px" v-model="verifCode" placeholder="验证码"></el-input>
                <span v-if="sendVerTime === 60" @click="sendVerif" class="FontBlue Pointer SendVerif">发送验证码</span>
                <span v-else @click="sendVerif" class="FontBlue Pointer SendVerif">发送验证码</span>
            </div>
            <span @click="login" class="LoginBtn FlexRow">登录</span>
            <span class="FontBlue Pointer LogonBtn">还没有账号？立即注册</span>
        </div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import 'echarts-gl';
export default {
    data() {
        return {
            active: 1,
            subMobile: '',
            password: '',
            showPwd: false,
            rand: '',
            phone: '',
            verifCode: '',
            sendVerTime: 60,
            sendVer: null,
        };
    },
    mounted() {
        setTimeout(() => {
            this.init();
        }, 100);
    },
    methods: {
        init() {
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
                        },
                    },
                },
            };
            option && myChart.setOption(option);
        },
        sendVerif() {
            this.sendVer = setInterval(() => {
                this.sendVerTime -= 1;
            }, 1000);
        },
        regPhone(phone) {
            // 正则手机号匹配
            let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
            return reg.test(phone);
        },
        login() {
            this.init().sendVerif(() => { }).regPhone();
            axios({
                method: 'GET',
                url: '/cmjc1/jiaocheng',
                params: {
                    method: 'delete',
                    id: id,
                },
            }).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        },
        refreshIdentifyingCode(v) {
            v.target.src = '/api3/app/wds/login/authImg?v=' + Math.random();
        },
    },
};
</script>
<style lang="less" scoped>
.LoginPage {
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
    box-shadow: 0 -1px 27px 0 rgb(158 168 179 / 33%), 0 2px 4px 0 rgb(158 168 179 / 33%), 0 14px 35px 0 rgb(158 168 179 / 52%);
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