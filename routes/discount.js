const express = require('express');
const queries = require('../db/queries/discount');

const router  = express.Router();

//--------GET---------

router.get('/read/short/version', (req, res) => {
	queries.getDiscountShortVersion()
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
