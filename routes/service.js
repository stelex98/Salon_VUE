const express = require('express');
const queries = require('../db/queries/service');
const helper  = require('../helper')

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

router.get('/position', (req, res) => {
	queries.getPosition()
    .then(data => {
        res.send(data);
    })
    .catch(error => console.log(`Error: ${error}`));
});

/**
 * groups = [{
 *      id    - id группы
 *      group - группа услуг ( например Спа)
 * }, {}] 
*/
router.get('/readGroups', async function(req, res) {
    try{
        const groups = await queries.readGroups();

        res.send(groups);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

/**
 * services = [{
 *      id       - id услуги
 *      service  - услуга ( например Спа для рук)
 *      id_group - id группы услуг
 *      group    - группа услуг ( например Спа)
 *      price    - стоимость услуги
 *      picture  - фотография услуги
 *      about_service - информация о услуге
 * }, {}] 
*/
router.get('/readAllServices', async function(req, res) {
    try{
        let services = await queries.readAllServices();
        console.log(services);
        res.send(services);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

// █████████████████████████████████████████ //
// ███████████████  GET(id)  ███████████████ //
// █████████████████████████████████████████ //

/**
 * service = {
 *      service  - услуга (например СПА для рук)
 *      group    - группa услуг (например СПА)
 *      price    - стоимость услуги
 *      picture  - фитография услуги
 *      about_service - информация о услуге
 * }
*/
router.get('/readOneService/:id', async function(req, res) {
    try{
        let result = await queries.readOneService(req.params.id);
        const service = result[0];
        
        res.send(service);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
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

/**
 * service (req.body) = {
 *      service  - услуга ( например Спа для рук)
 *      id_group - id группы услуг
 *      price    - стоимость услуги
 *      picture  - фитография услуги
 *      about_service - информация о услуге
 * }
*/
router.post('/add', async function(req, res) {
    try{
        let service   = req.body;
        let idService = (await queries.numItemsService())[0];
        idService = Number(idService.count);
        const nameFile = `service${idService+1}`;
        let picture = helper.writeImageInFile(service.picture, nameFile);
        service.picture = picture;
        console.log('service ', service);
        const id_service = (await queries.addService(service))[0];
        console.log('id ' , id_service);
        service = (await queries.readOneService(id_service))[0];
        console.log('seeervice ' ,service);
        res.send(service);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});


// █████████████████████████████████████████ //
// ███████████████    PUT    ███████████████ //
// █████████████████████████████████████████ //

/**
 * new_service = {
 *      service  - услуга ( например Спа для рук)
 *      id_group - id группы услуг
 *      price    - стоимость услуги
 *      picture  - фотография услуги
 *      about_service - информация о услуге
 * } 
*/
router.put('/update/:id', async function(req, res) {
    try{
        const new_service = req.body;
        const id_service  = req.params.id;

        let flagUpdate = await queries.updateService(id_service, new_service);

        flagUpdate = (flagUpdate === 1 ? true : false);

        res.send(flagUpdate);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

// █████████████████████████████████████████ //
// ███████████████   DELETE  ███████████████ //
// █████████████████████████████████████████ //

router.delete('/delete/:id', async function(req, res) {
    try{
        const id_service  = req.params.id;

        let flagDelete = await queries.deleteService(id_service);
        flagDelete = (flagDelete === 1 ? true : false);

        res.send(flagDelete);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});


module.exports = router;
