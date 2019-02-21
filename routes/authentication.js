const express  = require('express');
const queries  = require('../db/queries/authentication');
const CryptoJS = require("crypto-js");
const env      = require('../config/env');
const helper   = require('../helper')


const router   = express.Router();

router.post('/login/check', (req, res) => {
    queries.checkLogin(req.body.login)
	.then(data => {
		res.send( data[0] !== undefined ? true : false );
	})
	.catch(error => console.log(`Error: ${error}`));
});

router.post('/sign_up', async function(req, res) {
	let crypt = helper.cryptPass(req.body.password);
	let user = {
		'login'   : req.body.login,
		'password': crypt.pass,
		'role'    : req.body.role,
		'salt'    : crypt.salt
	};
	let id_user = await queries.addUser(user);
	let photo = 'grvfsvrsf';
	//let photo = helper.writeImageInFile(req.body.photo, req.body.login);
	let profile = {
		'name': req.body.name,
		'surname': req.body.surname,
		'date_birth': req.body.date_birth,
		'mail': req.body.mail,
		'phone': req.body.phone,
		'photo': photo
	};
	let id_profile = await queries.addProfile(profile);
	
	let client = {
		'id_profile': id_profile[0],
		'id_user': id_user[0]
	}
	client = await queries.addClient(client);
	
	res.send(client[0]);
});


// //авторизация
// router.post('/login', (req, res) => {
//     console.log(req.body);
// 	queries.checkLogin(req.body.login)
// 	.then(data => {
// 		if(data[0] !== undefined){
// 			console.log(data);
// 			// if(checkPassword(data[0].password, data[0].salt, req.body.password, req.body.salt)){
// 			// 	req.session.login = data[0].login;
// 			// 	req.session.key = data[0].id;
// 			// 	req.session.role = data[0].role;
// 			// 	res.send({'role': data[0].role, 'login': data[0].login});
// 			// }
// 		}
// 		else{
// 			res.send('Неверный логин или пароль!')
// 		}
// 	})
// 	.catch(error => console.log(`Error: ${error}`));
// });

// function checkPassword(crypt_pass, user_salt, pass, salt){
// 	let bytes  = CryptoJS.AES.decrypt(crypt_pass, user_salt+global_salt);
// 	let password = bytes.toString(CryptoJS.enc.Utf8);
// 	let hash = CryptoJS.PBKDF2(password, salt, { keySize: 128/32 });
// 	if(hash.toString() === pass)
// 		return true;
// 	else
// 		return false;
// }

module.exports = router;