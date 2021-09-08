import localStorage from 'store'
const state = {
    isCollapse: localStorage.get('isCollapse') === undefined ? false : localStorage.get('isCollapse'),
    userMsg: localStorage.get('userMsg') ? localStorage.get('userMsg') : {},
}
const getters = {
    getUserMsg: (state) => {
        return state.userMsg
    },
    getIsCollapse: (state, getters, rootState, rootGetters) => {
        return state.isCollapse
    },
}
const actions = {
    isCollapse({ dispatch, commit, getters, rootGetters }, isCollapse) {
        commit('isCollapse', isCollapse);
    },
    setUserMsg({ commit }, userMsg) {
        commit('setUserMsg', userMsg)
        localStorage.set('userMsg', userMsg)
    }
}
const mutations = {
    isCollapse(state, isCollapse) {
        state.isCollapse = isCollapse
        localStorage.set('isCollapse', isCollapse)
    },
    setUserMsg(state, userMsg) {
        localStorage.set('token', userMsg.token)
        state.userMsg = userMsg
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}