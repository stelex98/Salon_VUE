const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getServicesByGroup() {
    return knex.select('service.id', 'service.service', 'service.id_group', 'group.group')
               .join('group', 'service.id_group', 'group.id')
               .from('service')
               .orderBy('id_group');
}

function getPrices() {
    return knex.select('service', 'price')
               .from('service');
}

//-------------------SELECT--------------------

function getOneService(id) {
    return knex.select()
               .from('service')
               .where({ 'id': parseInt(id) });
  }

//-----------------INSERT----------------


//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getServicesByGroup,
    getOneService,
    getPrices
};