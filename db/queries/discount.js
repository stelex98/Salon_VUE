const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getDiscountShortVersion() {
    return knex.select('discount.id', 'discount.discount', 'service.service', 'service.about_service')
               .join('discount', 'service.id', 'discount.id_service')
               .from('service')
               .where( 'discount.date', '>',  knex.fn.now());;
}

function getDiscountFullVersion() {
    return knex.select('*')
               .join('discount', 'service.id', 'discount.id_service')
               .from('service')
               .where( 'discount.date', '>',  knex.fn.now());
}



//-------------------SELECT--------------------

function getDiscount(id) {
    return knex.select('*')
               .join('discount', 'service.id', 'discount.id_service')
               .from('service')
               .where({ 'discount.id' : parseInt(id) });
}

//-----------------INSERT----------------

function addDiscount(discount){
    return knex.insert(discount)
               .returning('id')
               .into('discount');
}

//----------------UPDATE------------------

function updateDiscount(id, discount){
    return knex.update(discount)
               .from('discount')
               .where({ 'id': parseInt(id) });
}

//----------------DELETE------------------

function deleteDiscount(id){
    return knex.del()
               .from('discount')
               .where({ 'id': parseInt(id) });
}


module.exports = {
    getDiscountShortVersion,
    getDiscountFullVersion,
    getDiscount,
    addDiscount,
    updateDiscount,
    deleteDiscount

};