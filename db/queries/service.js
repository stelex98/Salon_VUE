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

function getPosition() {
    return knex.select('id', 'position')
               .from('position');
}

function getGroup() {
    return knex.select('*')
               .from('group');
}

function readAllServices() {
    return knex.select('*')
               .join('service', 'group.id', 'service.id_group')
               .from('group')
               .orderBy(['group.id', 'service.id']);
}

//-------------------SELECT--------------------

function getOneService(service) {
    return knex.select('*')
               .from('service')
               .where({ 'service': String(service) });
}

function getServicesOneGroup(id_group) {
    let id_discount = knex.select('id_service')
                          .from('discount'); 
    return  knex.select('id', 'service')
                .from('service')
                .where('id', 'not in', id_discount)
                .andWhere({ 'service.id_group': parseInt(id_group) });
}

//-----------------INSERT----------------

function addService(service){
    return knex.insert(service)
               .returning('*')
               .into('service');
}

//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getServicesByGroup,
    getOneService,
    getPrices,
    getGroup,
    getServicesOneGroup,
    addService,
    getPosition,
    readAllServices
};