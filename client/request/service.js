const axios      = require('axios');


const url        = 'http://localhost:3010/service';
const apiService = {};

apiService.readByGroup = function () {
    return axios.get(`${url}/read/by_group`);
}

apiService.readOne = function (service) {
    return axios.get(`${url}/read_one/${service}`);
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

apiService.readPosition = function (id_group) {
    return axios.get(`${url}/position`);
}

apiService.readAllServices = function () {
    return axios.get(`${url}/readAllServices`);
}

apiService.readGroups= function () {
    return axios.get(`${url}/readGroups`);
}

apiService.add = function (service) {
    return axios.post(`${url}/add`, service);
}

apiService.update = function (id_service, new_service) {
    return axios.put(`${url}/update/${id_service}`, new_service);
}

apiService.delete = function (id_service) {
    return axios.delete(`${url}/delete/${id_service}`);
}


export default apiService;

