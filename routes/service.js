const express = require('express');
const queries = require('../db/queries/service');

const router  = express.Router();

// █████████████████████████████████████████ //
// ███████████████    GET    ███████████████ //
// █████████████████████████████████████████ //

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

router.get('/position', (req, res) => {
	queries.getPosition()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

/**
 * services = [{
 *      id       - id услуги
 *      service  - услуга ( например Спа для рук)
 *      id_group - id группы услуг
 *      group    - группа услуг ( например Спа)
 *      price    - стоимость услуги
 *      picture  - фитография услуги
 *      about_service - информация о услуге
 * }, {}] 
*/
router.get('/readAllServices', async function(req, res) {
    try{
        let services = await queries.readAllServices();

        res.send(services);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

// █████████████████████████████████████████ //
// ███████████████  GET(id)  ███████████████ //
// █████████████████████████████████████████ //

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

// █████████████████████████████████████████ //
// ███████████████    POST   ███████████████ //
// █████████████████████████████████████████ //

router.post('/add', (req, res) => {
	queries.addService(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

// █████████████████████████████████████████ //
// ███████████████    PUT    ███████████████ //
// █████████████████████████████████████████ //



// █████████████████████████████████████████ //
// ███████████████   DELETE  ███████████████ //
// █████████████████████████████████████████ //


module.exports = router;
