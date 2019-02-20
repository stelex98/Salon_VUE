const express  = require('express');
const queries  = require('../db/queries/authorization');
const CryptoJS = require("crypto-js");
const env      = require('.././config/env');


const router   = express.Router();

//авторизация
router.post('/login', (req, res) => {
    console.log(req.body);
	queries.checkLogin(req.body.login)
	.then(data => {
		if(data[0] !== undefined){
			// if(checkPassword(data[0].password, data[0].salt, req.body.password, req.body.salt)){
			// 	req.session.login = data[0].login;
			// 	req.session.key = data[0].id;
			// 	req.session.role = data[0].role;
			// 	res.send({'role': data[0].role, 'login': data[0].login});
			// }
		}
		else{
			res.send('Неверный логин или пароль!')
		}
	})
	.catch(error => console.log(`Error: ${error}`));
});

function checkPassword(crypt_pass, user_salt, pass, salt){
	let bytes  = CryptoJS.AES.decrypt(crypt_pass, user_salt+global_salt);
	let password = bytes.toString(CryptoJS.enc.Utf8);
	let hash = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 });
	if(hash.toString() === pass)
		return true;
	else
		return false;
}