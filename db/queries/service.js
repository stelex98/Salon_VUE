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

function readGroups () {
    return knex.select('*')
               .from('group');
}

function readAllServices() {
    return knex.select('*')
               .join('service', 'group.id', 'service.id_group')
               .from('group')
               .orderBy(['group.id', 'service.id']);
}

function numItemsService() {
    return knex.count('id')
               .from('service')
}

//-------------------SELECT--------------------

function readOneService(id) {
    return knex.select('*')
               .from('group')
               .join('service', 'group.id', 'service.id_group')
               .where({ 'service.id': parseInt(id) });
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
               .returning('id')
               .into('service');
}

//----------------UPDATE------------------

function updateService(id, new_service){
    return knex.update(new_service)
               .from('service')
               .where({ 'id': parseInt(id) });
}

//----------------DELETE------------------

function deleteService(id){
    return knex.del()
               .from('service')
               .where({ 'id': parseInt(id) });
}


module.exports = {
    getServicesByGroup,
    readOneService,
    getPrices,
    getServicesOneGroup,
    addService,
    getPosition,
    readAllServices,
    readGroups,
    updateService,
    deleteService,
    numItemsService
};