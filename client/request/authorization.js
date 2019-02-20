const axios = require('axios');

const url = 'http://localhost:3010/authorization';

let apiAutho = {};

apiAutho.authorization = function (login, password) {
    return axios.post(`${url}/login`, {
        login   : login,
        password: password
    });
}




export default apiAutho;

