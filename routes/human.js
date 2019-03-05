const express      = require('express');
const queries      = require('../db/queries/human');
const queries_auth = require('../db/queries/authentication');
const helper       = require('../helper')

const router       = express.Router();

//--------GET---------

router.get('/read/masters', (req, res) => {
	queries.getMasters()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------



//--------POST--------

router.post('/add/master', async function(req, res){
    try{
        let crypt   = helper.cryptPass(req.body.password);
        let user    = {
            'login'   : req.body.login,
            'password': crypt.pass,
            'role'    : req.body.role,
            'salt'    : crypt.salt
        };
        let id_user = (await queries_auth.addUser(user))[0];
        let master  = {
            'id_user'     : id_user,
            'name'        : req.body.name,
            'surname'     : req.body.surname,
            'id_position' : req.body.id_position
        };
        let a = (await queries.addMaster(master))[0];
        res.send(a);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
});

router.post('/check/master', async function (req, res) {
    try{
        let user = (await queries.checkMaster(req.body.id_master))[0];
        res.send(
            helper.checkMaster(req.body.login, req.body.password, user)
            ? true 
            : false
        );
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
});

//---------PUT--------

//-------DELETE-------

router.delete('/delete/master/:id_master', async function(req, res) {
    try{
        let id_user = (await queries.idUser(req.params.id_master))[0].id_user;
        let flag_m  = await queries.deleteMaster(req.params.id_master);
        let flag_u  = await queries.deleteUser(id_user);
        res.send((flag_m === 1 && flag_u === 1) ? true : false);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
});


module.exports = router;
