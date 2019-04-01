export default {
    addUser(state, payload) {
        state.user = payload;
    },
    addCurrentAction(state, payload){
        state.currentAction = payload;
    }
}