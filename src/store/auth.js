import { defineStore } from 'pinia'
import api from '@/api'
export const Auth = defineStore('Auth', {
    state: () => {
        return {
            power: [],
        }
    },
    getters: {
        getPower: (state) => {
            return state.power
        }
    },
    actions: {
        async setPower() {
            let res = await api.BaseApi.getPower()
            if (res.code === 200) {
                this.power = res.data
                return true
            }
        }
    }
})