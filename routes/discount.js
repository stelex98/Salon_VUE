const express = require('express');
const queries = require('../db/queries/discount');


const router  = express.Router();

// █████████████████████████████████████████ //
// ███████████████    GET    ███████████████ //
// █████████████████████████████████████████ //

/**
 * disconts = [{
 *      id       - id акции
 *      discount - процент скидки
 *      service  - услуга
 *      about_service - информация о услуге
 * }, {}] 
*/
router.get('/readShortVersion', async function (req, res) {
    try{
        let disconts = await queries.getDiscountShortVersion();

        res.send(disconts);
    }
    catch(error){
        console.log(`Error: ${error}`) 
    }
});

/**
 *  discounts = [{
 *      id            - id скидки
 *      id_service    - id услуги
 *      discount      - процент скидки
 *      date          - дата, до которого дня скидка
 *      service       - название услуги
 *      id_group      - id группы услуг
 *      price         - цена
 *      picture       - картинка услуги
 *      about_service - информация о услуге
 * }, {}]
*/
router.get('/readFullVersion', async function (req, res) {
    try{
        let disconts = await queries.getDiscountFullVersion();
        console.log(disconts);
        res.send(disconts);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

// █████████████████████████████████████████ //
// ███████████████  GET(id)  ███████████████ //
// █████████████████████████████████████████ //

/** 
 * discount = {
 *      id            - id скидки
 *      id_service    - id услуги
 *      discount      - процент скидки
 *      date          - дата, до которого дня скидка
 *      service       - название услуги
 *      id_group      - id группы услуг
 *      price         - цена
 *      picture       - картинка услуги
 *      about_service - информация о услуге
 * }
*/
router.get('/readOne/:id', async function (req, res) {
    try{
        let id_discount = req.params.id;
        let discount     = (await queries.getDiscount(id_discount))[0];
        
        res.send(discount);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
});

// █████████████████████████████████████████ //
// ███████████████    POST   ███████████████ //
// █████████████████████████████████████████ //

/**
 * req.body = {
 *      id_service - id услуги
 *      discount   - процент скидки
 *      date       - дата, до которого дня скидка
 * } 
 * 
 * discount = {
 *      id            - id скидки
 *      id_service    - id услуги
 *      discount      - процент скидки
 *      date          - дата, до которого дня скидка
 *      service       - название услуги
 *      id_group      - id группы услуг
 *      price         - цена
 *      picture       - картинка услуги
 *      about_service - информация о услуге
 * }
*/
router.post('/add', async function (req, res) {
    try{
        let id_discount = (await queries.addDiscount(req.body))[0];
        let discount     = (await queries.getDiscount(id_discount))[0];
        
        res.send(discount);
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
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
