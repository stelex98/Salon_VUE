export default {
    addNewCurrentStock(state, payload) {
        state.currentStock[0] = payload;
    },
    addNewCurrentStockAdmin(state, payload) {
        //state.currentIndexStockForAdmin[0] = payload;
        state.currentStockForAdmin = payload;
    },
    addNewStock(state, payload) {
        state.allStock.push(payload);
    },
    deleteCurrentStock(state, payload) {
        state.currentStockForAdmin.splice(payload, 1);
    },
    editStockArray(state, payload) {
        state.stock[state.currentIndexStockForAdmin[0]] = payload[0];
    },
    addCurrentStockForEdit(state, payload){
        state.currentIdForEdit[0] = payload;
    }
}