const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getDiscountShortVersion() {
    return knex.select('discount.discount', 'service.service', 'service.photo')
               .join('service', 'discount.id_service', 'service.id')
               .from('discount');
}

//-------------------SELECT--------------------



//-----------------INSERT----------------



//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getDiscountShortVersion,

};