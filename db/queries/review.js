const knex = require('../connection');


//для отладки 
//.on('query', function(data) {
//  console.log('debug query:', data);
//})

//------------------SELECT *-----------------------

function getReviews() {
    return knex.select('profile.name', 'profile.photo', 'review.review')
               .join('profile', 'client.id_profile', 'profile.id')
               .join('review', 'client.id', 'review.id_client')
               .from('client');
}

//-------------------SELECT--------------------

// function getFullName(id) {
//     return knex.select('profile.name', 'profile.photo')
//                .where({ 'client.id_user': parseInt(id) })
//                .join('profile', 'client.id_profile', 'profile.id')
//                .from('client');
// }

function getClientId(id) {
    return knex.select('client.id', 'profile.photo', 'profile.name')
               .join('profile', 'client.id_profile', 'profile.id')
               .where({ 'id_user': parseInt(id) })
               .from('client');
}

//-----------------INSERT----------------

function addReview(review){
	return knex.insert(review).returning('*').into('review');
}

//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getReviews,
    addReview,
    //getFullName,
    getClientId
};