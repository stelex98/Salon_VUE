const express = require('express');
const queries = require('../db/queries/review');

const router  = express.Router();

//--------GET---------

router.get('/read', (req, res) => {
	queries.getReviews()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------


//--------POST--------

router.post('/add', async function (req, res) {
    try{
        //console.log(req.sesssion);
        let id_user   = req.body.id_user;
        //let id_user   = req.session.cid;
        let client = (await queries.getClientId(id_user))[0];

        let review_cl = {
            id_client : client.id,
            review    : req.body.review
        }

        await queries.addReview(review_cl);
        
        review_cl = {
            name   : client.name,
            photo  : client.photo,
            review : req.body.review
        }
        res.send(review_cl);
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
    
});

//---------PUT--------

//-------DELETE-------


module.exports = router;
