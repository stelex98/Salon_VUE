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

//---------PUT--------

//-------DELETE-------


module.exports = router;
