const axios = require('axios');

const url = 'http://localhost:3010/service';

let apiService = {};

apiService.readByGroup = function () {
    return axios.get(`${url}/read/by_group`);
}

apiService.readOne = function (id) {
    return axios.get(`${url}/read_one/${id}`);
}

apiService.readPrice = function () {
    return axios.get(`${url}/read/price`);
}


export default apiService;

