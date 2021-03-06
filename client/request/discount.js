const axios       = require('axios');


const url         = 'http://localhost:3010/discount';
const apiDiscount = {};

apiDiscount.readDiscountForMainPage = function () {
    return axios.get(`${url}/readShortVersion`);
}

apiDiscount.readDiscountForDiscountPage = function () {
    return axios.get(`${url}/readFullVersion`);
}

apiDiscount.readOne = function (id_discount) {
    return axios.get(`${url}/readOne/${id_discount}`);
}

apiDiscount.add = function (discount) {
    return axios.post(`${url}/add`, discount);
}

apiDiscount.update = function (id_discount, new_discount) {
    return axios.put(`${url}/update/${id_discount}`, new_discount);
}

apiDiscount.delete = function (id_discount) {
    return axios.delete(`${url}/delete/${id_discount}`);
}



export default apiDiscount;

