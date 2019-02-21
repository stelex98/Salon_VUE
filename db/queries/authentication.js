const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------



//-------------------SELECT--------------------

function checkLogin(login) {
    return knex.select()
               .from('public.user')
               .where({login: String(login)});
  }

//-----------------INSERT----------------

function addUser(user){
	return knex.insert(user).returning('id').into('public.user');
}

function addProfile(profile){
	return knex.insert(profile).returning('id').into('profile');
}

function addClient(client){
	return knex.insert(client).returning('*').into('client');
}

//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    checkLogin,
    addUser,
    addProfile,
    addClient,
    
};