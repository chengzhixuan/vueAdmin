import localStorage from 'store'
import { defineStore } from 'pinia'

export const PublicStore = defineStore('PublicStore', {
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
        setUserMsg(userMsg) {
            localStorage.set('userMsg', userMsg)
            localStorage.set('token', userMsg.token)
            this.userMsg = userMsg
        }
    }
})