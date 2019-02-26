const axios = require('axios');

const url = 'http://localhost:3010/discount';

let apiDiscount = {};

apiDiscount.readDiscountForMainPage = function () {
    return axios.get(`${url}/read/short/version`);
}



export default apiDiscount;

