const express  = require('express');
const queries  = require('../db/queries/authentication');
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
	try{
		let crypt   = helper.cryptPass(req.body.password);
		let user    = {
			'login'   : req.body.login,
			'password': crypt.pass,
			'role'    : req.body.role,
			'salt'    : crypt.salt
		};
		let id_user = (await queries.addUser(user))[0];

		let photo = helper.writeImageInFile(req.body.photo, req.body.login);
		
		let profile = {
			'name'      : req.body.name,
			'surname'   : req.body.surname,
			'date_birth': req.body.date_birth,
			'mail'      : req.body.mail,
			'phone'     : req.body.phone,
			'photo'     : photo
		};
		let id_profile = (await queries.addProfile(profile))[0];
		
		let client     = {
			'id_profile': id_profile,
			'id_user'   : id_user
		}
		client = await queries.addClient(client);
		
		res.send(client[0]);
	}
	catch(error){
		console.log(`Error: ${error}`)
	}
});

router.post('/log_in', async function(req, res) {
	try{
		let user = (await queries.checkLogin(req.body.log))[0];
		if(user !== undefined){
			if(helper.checkPassword(user.password, user.salt, req.body.pass, req.body.salt)){
				req.session.login = user.login;
				req.session.id    = user.id;
				req.session.role  = user.role;
				res.send(user.role);
			}
			else			
				res.send(null);
		}
		else
			res.send(null);
		
	}
	catch(error){
		console.log(`Error: ${error}`)
	}
	
});


module.exports = router;