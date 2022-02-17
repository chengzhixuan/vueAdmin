import axios from './axios'
export default {
    login(phone, verifCode) {
        return new Promise((resolve, reject) => {
            axios({
                url: "/login",
                method: "post",
                data: { phone, verifCode }
            }).then(res => {
                console.log(res, 666666)
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}