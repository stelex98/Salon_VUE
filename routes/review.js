const express = require('express');
const queries = require('../db/queries/review');

const router  = express.Router();

//--------GET---------

router.get('/read', (req, res) => {
	queries.getReviews()
    .then(data => {
        console.log(data);
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------


//--------POST--------

router.post('/add', async function (req, res) {
    try{
        //let id_client = (await queries.getClientId(req.body.id))[0].id;
        let id_client = (await queries.getClientId(req.session.id))[0];
        let review_cl = {
            id_client: id_client,
            review   : req.body.review
        }
        review_cl = (await queries.addReview(review_cl))[0];
        res.send(review_cl);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
    
});

//---------PUT--------

//-------DELETE-------


module.exports = router;
