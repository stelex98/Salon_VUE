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


//-----------------INSERT----------------

function addReview(review){
	return knex.insert(review).returning('*').into('review');
}

//----------------UPDATE------------------



//----------------DELETE------------------




module.exports = {
    getReviews,
    addReview
};