import localStorage from 'store'
import { Auth } from './auth'
import { defineStore } from 'pinia'
export const PublicStore = defineStore('Public', {
    state: () => {
        return {
            isCollapse: localStorage.get('isCollapse') === undefined ? false : localStorage.get('isCollapse'),
            userMsg: localStorage.get('userMsg') ? localStorage.get('userMsg') : {},
        }
    },
    getters: {
        getUserMsg: (state) => {
            return state.userMsg
        },
        getIsCollapse() {
            return this.isCollapse
        },
    },
    actions: {
        setIsCollapse(isCollapse) {
            this.isCollapse = isCollapse
            localStorage.set('isCollapse', isCollapse);
        },
        async setUserMsg(userMsg) {
            const authStore = Auth()
            let res = await authStore.setPower()
            if (res) {
                userMsg.authList = authStore.power
                localStorage.set('userMsg', userMsg)
                localStorage.set('token', userMsg.token)
                this.userMsg = userMsg
                return true
            } else {
                return false
            }
        }
    }
})