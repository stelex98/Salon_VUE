export default {
    addUser({ commit }, payload) {
        commit('addUser', payload)
    },
    addCurrentAction({ commit }, payload){ /*for admin!!! current page to use */
        commit('addCurrentAction', payload)
    }
}