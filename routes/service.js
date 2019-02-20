const express = require('express');
const queries = require('../db/queries/service');

const router  = express.Router();

//--------GET---------

router.get('/read/by_group', (req, res) => {
	queries.getServicesByGroup()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

router.get('/read/price', (req, res) => {
	queries.getPrices()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------

router.get('/read_one/:id', (req, res) => {
	queries.getOneService(req.params.id)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

//--------POST--------

//---------PUT--------

//-------DELETE-------


module.exports = router;
