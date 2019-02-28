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

router.get('/read/service_type', (req, res) => {
	queries.getGroup()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------

router.get('/read_one/:service', (req, res) => {
	queries.getOneService(req.params.service)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

router.get('/read/service/:id', (req, res) => {
	queries.getServicesOneGroup(req.params.id)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

//--------POST--------

router.post('/add', (req, res) => {
    console.log(req.body);
	queries.addService(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

//---------PUT--------

//-------DELETE-------


module.exports = router;
