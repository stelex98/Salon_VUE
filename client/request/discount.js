const axios = require('axios');

const url = 'http://localhost:3010/discount';

let apiDiscount = {};

apiDiscount.readDiscountForMainPage = function () {
    return axios.get(`${url}/read/short/version`);
}

apiDiscount.readDiscountForDiscountPage = function () {
    return axios.get(`${url}/read/full/version`);
}



export default apiDiscount;

