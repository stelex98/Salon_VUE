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

apiService.readServiceType = function () {
    return axios.get(`${url}/read/service_type`);
}

apiService.readServiceByType = function (id_group) {
    return axios.get(`${url}/read/service/${id_group}`);
}

export default apiService;

