export default {
    addCurrentDataImg(state, payload){
        state.currentDataImageBase64 = payload;
    },
    clearCurrentDataImg(state){
        state.currentDataImageBase64 = '';
    }
}
    