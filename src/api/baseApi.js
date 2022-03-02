import axios from './axios'
export default {
    /**
     * 登入
     * @param {*} phone 手机
     * @param {*} verifCode 验证码
     * @returns 
     */
    login(phone, verifCode) {
        return new Promise((resolve, reject) => {
            axios({
                url: "/login",
                method: "post",
                data: { phone, verifCode }
            }).then(res => {
                resolve(res.data)
            })
        })
    },
    /**
     * 获取用户的权限
     * @returns 
     */
    getPower() {
        return new Promise((resolve, reject) => {
            axios({
                url: "/getPower",
                method: "post",
            }).then(res => {
                resolve(res.data)
            })
        })
    }
}