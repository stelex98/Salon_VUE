const axios = require('axios');

const url = 'http://localhost:3010/authentication';

let apiAuthe = {};

apiAuthe.checkLogin = function (login) {
    return axios.post(`${url}/login/check`, {
        login: login
    });
}

apiAutho.authorization = function (login, password) {
    return axios.post(`${url}/login`, {
        login   : login,
        password: password
    });
}




export default apiAuthe;

