const axios = require('axios');

const url = 'http://localhost:3010/review';

let apiReview = {};

apiReview.read = function () {
    return axios.get(`${url}/read`);
}

apiReview.addOne = function (review) {
    return axios.post(`${url}/add`, review);
}


export default apiReview;

