export default {
    addNewReviews(state, payload) { // добавляем новые акции
        state.dataReviewsSlider = payload;
    },
    addOneNewReviews(state, payload) { // добавляем новые акции
        console.log(payload);
        state.dataReviewsSlider.push(payload);
    },
}
    