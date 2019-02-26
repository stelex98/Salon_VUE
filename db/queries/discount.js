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
               .from('discount');
}



//-------------------SELECT--------------------



//-----------------INSERT----------------



//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getDiscountShortVersion,
    getDiscountFullVersion,

};