const axios = require('axios');

const url = 'http://localhost:3010/authentication';

let apiAuthe = {};

apiAuthe.checkLogin = function (login) {
    return axios.post(`${url}/login/check`, {
        login: login
    });
}

apiAuthe.registration = function (user) {
    return axios.post(`${url}/sign_up`, user);
}

apiAuthe.authorization = function (login, password) {
    return axios.post(`${url}/login`, {
        login   : login,
        password: password
    });
}




export default apiAuthe;

