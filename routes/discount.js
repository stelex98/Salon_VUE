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

router.get('/read/full/version', (req, res) => {
	queries.getDiscountFullVersion()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});


//-------GET(id)------

//--------POST--------

router.post('/add', (req, res) => {
	queries.addDiscount(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

//---------PUT--------

router.put('/update/:id', (req, res) => {
	queries.updateDiscount(req.params.id, req.body)
    .then(data => {
        res.send(data === 1 ? true : false);
    })
    .catch(error => console.log(`Error: ${error}`));
});

//-------DELETE-------

router.delete('/delete/:id', (req, res) => {
	queries.deleteDiscount(req.params.id)
    .then(data => {
        res.send(data === 1 ? true : false);
    })
    .catch(error => console.log(`Error: ${error}`));
});

module.exports = router;
