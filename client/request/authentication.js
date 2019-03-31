const axios    = require('axios');


const url      = 'http://localhost:3010/authentication';
const apiAuthe = {};

apiAuthe.checkLogin = function (login) {
    return axios.post(`${url}/checkLogin`, {
        login: login
    });
}

apiAuthe.registration = function (user) {
    return axios.post(`${url}/signUp`, user);
}

apiAuthe.authorization = function (requisites) {
    return axios.post(`${url}/signInByCredential`, requisites);
}


export default apiAuthe;

