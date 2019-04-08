const axios      = require('axios');


const url        = 'http://localhost:3010/service';
const apiService = {};


// █████████████████████████████████████████ //
// ███████████████    READ   ███████████████ //
// █████████████████████████████████████████ //

apiService.readByGroup = function () {
    return axios.get(`${url}/read/by_group`);
}

apiService.readOneService = function (id_service) {
    return axios.get(`${url}/readOneService/${id_service}`);
}

apiService.readPrice = function () {
    return axios.get(`${url}/read/price`);
}

apiService.readServiceByType = function (id_group) {
    return axios.get(`${url}/read/service/${id_group}`);
}

apiService.readPosition = function () {
    return axios.get(`${url}/position`);
}

apiService.readAllServices = function () {
    return axios.get(`${url}/readAllServices`);
}

apiService.readGroups = function () {
    return axios.get(`${url}/readGroups`);
}

// █████████████████████████████████████████ //
// ███████████████    ADD    ███████████████ //
// █████████████████████████████████████████ //

apiService.addService = function (service) {
    return axios.post(`${url}/add`, service);
}

// █████████████████████████████████████████ //
// ███████████████   UPDATE  ███████████████ //
// █████████████████████████████████████████ //

apiService.updateService = function (id_service, new_service) {
    return axios.put(`${url}/update/${id_service}`, new_service);
}


// █████████████████████████████████████████ //
// ███████████████   DELETE  ███████████████ //
// █████████████████████████████████████████ //

apiService.deleteService = function (id_service) {
    return axios.delete(`${url}/delete/${id_service}`);
}


export default apiService;

