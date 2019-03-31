const axios    = require('axios');


const url      = 'http://localhost:3010/human';
const apiHuman = {};

apiHuman.readAllMasters = function () {
    return axios.get(`${url}/read/masters`);
}

apiHuman.addMaster = function (master) {
    return axios.post(`${url}/add/master`, master);
}

apiHuman.checkMaster = function (master) {
    return axios.post(`${url}/check/master`, master);
}

apiHuman.deleteMaster = function (id_master) {
    return axios.delete(`${url}/delete/master/${id_master}`);
}


export default apiHuman;

