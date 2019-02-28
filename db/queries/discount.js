const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getDiscountShortVersion() {
    return knex.select('discount.id', 'discount.discount', 'service.service', 'service.about_service')
               .join('service', 'discount.id_service', 'service.id')
               .from('discount');
}

function getDiscountFullVersion() {
    return knex.select('*')
               .join('service', 'discount.id_service', 'service.id')
               .from('discount')
               .where( 'discount.date', '<',  knex.fn.now());
}



//-------------------SELECT--------------------



//-----------------INSERT----------------

function addDiscount(discount){
    return knex.insert(discount)
               .returning('*')
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
    addDiscount,
    updateDiscount,
    deleteDiscount

};