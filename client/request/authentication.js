const axios    = require('axios');


const url      = 'http://localhost:3010/authentication';
const apiAuthe = {};

apiAuthe.checkLogin = function (login) {
    return axios.post(`${url}/login/check`, {
        login: login
    });
}

apiAuthe.registration = function (user) {
    return axios.post(`${url}/sign_up`, user);
}

apiAuthe.authorization = function (requisites) {
    return axios.post(`${url}/log_in`, requisites);
}


export default apiAuthe;

