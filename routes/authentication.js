const express  = require('express');
const queries  = require('../db/queries/authentication');
const helper   = require('../helper')


const router   = express.Router();

router.post('/checkLogin', async function ( req, res ){
	try{
		let login = req.body.login;
		let check = (await queries.checkLogin(login))[0];
		check = (check === undefined ? false : true);
		
		res.send(check);
	}
	catch(error){
		console.log(`Error: ${error}`);
	}
});

router.post('/signUp', async function(req, res) {
	try{
		let crypt   = helper.cryptPass(req.body.password);
		let user    = {
			login   : req.body.login,
			password: crypt.pass,
			role    : req.body.role,
			salt    : crypt.salt
		};
		let id_user = (await queries.addUser(user))[0];

		let photo = helper.writeImageInFile(req.body.photo, req.body.login);
		
		let profile = {
			name      : req.body.name,
			surname   : req.body.surname,
			date_birth: req.body.date_birth,
			mail      : req.body.mail,
			phone     : req.body.phone,
			photo     : photo
		};
		let id_profile = (await queries.addProfile(profile))[0];
		
		let client     = {
			id_profile: id_profile,
			id_user   : id_user
		}
		client = await queries.addClient(client);
		
		res.send(client[0]);
	}
	catch(error){
		console.log(`Error: ${error}`)
	}
});

router.post('/signInByCredential', async function(req, res) {
	try{
		let user = (await queries.checkLogin(req.body.log))[0];
		let role = null;

		if(user !== undefined){

			if(helper.checkPassword(user.password, user.salt, req.body.pass, req.body.salt)){
				
				req.session.login = user.login; //edit
				req.session.cid    = user.id;
				req.session.role  = user.role; //*
				
				role = user.role;
				req.session.save(); // edit
			}	
		}
		res.send(role);
	}
	catch(error){
		console.log(`Error: ${error}`)
	}
});


module.exports = router;