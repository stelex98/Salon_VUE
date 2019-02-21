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



//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    checkLogin,
    
};