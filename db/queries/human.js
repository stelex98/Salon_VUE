const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getMasters() {
    return knex.select('master.id', 'master.name', 'master.surname', 'position.position')
               .join('position', 'master.id_position', 'position.id')
               .from('master');
}



//-------------------SELECT--------------------

function checkMaster(id_master){
    return knex.select('public.user.login', 'public.user.password', 'public.user.salt')
               .from('public.user')
               .join('master', 'public.user.id', 'master.id_user')
               .where({ 'master.id': parseInt(id_master) })
}

function idUser(id_master){
    return knex.select('id_user')
               .from('master')
               .where({ 'id': parseInt(id_master) });
}

//-----------------INSERT----------------

function addMaster(master){
	return knex.insert(master).returning('*').into('master');
}

//----------------UPDATE------------------



//----------------DELETE------------------

function deleteMaster(id_master){
    return knex.del()
               .from('master')
               .where({ 'id': parseInt(id_master) });
}

function deleteUser(id_user){
    return knex.del()
               .from('public.user')
               .where({ 'id': parseInt(id_user) });
}



module.exports = {
    getMasters,
    addMaster,
    checkMaster,
    deleteMaster,
    deleteUser,
    idUser,

};