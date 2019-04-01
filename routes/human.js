const express      = require('express');
const queries      = require('../db/queries/human');
const queries_auth = require('../db/queries/authentication');
const helper       = require('../helper')

const router       = express.Router();

// █████████████████████████████████████████ //
// ███████████████    GET    ███████████████ //
// █████████████████████████████████████████ //

/**
 * masters = [{
 *      id       - id мастера
 *      name     - имя мастера
 *      surname  - фамилия мастера
 *      login    - логин мастера
 *      position - специализация мастера
 * }, {}] 
*/
router.get('/read/masters', async function(req, res) {
    try{
        let masters = await queries.getAllMasters();

        res.send(masters);
    }
    catch(error){
        console.log(`Error: ${error}`); 
    }
});


//-------GET(id)------



// █████████████████████████████████████████ //
// ███████████████    POST   ███████████████ //
// █████████████████████████████████████████ //

/**
 * newMaster = [{
 *      name        - имя мастера
 *      surname     - фамилия мастера
 *      login       - логин мастера
 *      password    - пароль мастера
 *      role        - роль 
 *      id_position - специализация мастера
 * }, {}] 
*/
router.post('/add/master', async function(req, res){
    try{
        let newMaster = req.body;
        let crypt     = helper.cryptPass(newMaster.password);
        let user      = {
            'login'   : newMaster.login,
            'password': crypt.pass,
            'role'    : newMaster.role,
            'salt'    : crypt.salt
        };
        let id_user = (await queries_auth.addUser(user))[0];

        let master  = {
            'id_user'     : id_user,
            'name'        : newMaster.name,
            'surname'     : newMaster.surname,
            'id_position' : newMaster.id_position
        };
        await queries.addMaster(master);
        res.send(true);
    }
    catch(error){
        res.send(false);
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

// █████████████████████████████████████████ //
// ███████████████  DELETE   ███████████████ //
// █████████████████████████████████████████ //

router.delete('/delete/master/:id_master', async function(req, res) {
    try{
        console.log(req.params.id_master);

        let id_user = (await queries.idUser(req.params.id_master))[0].id_user;
        console.log(id_user);
        let flag_m  = await queries.deleteMaster(req.params.id_master);
        let flag_u  = await queries.deleteUser(id_user);

        res.send((flag_m === 1 && flag_u === 1) ? true : false);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
});


module.exports = router;
