const express        = require("express");
const bodyParser     = require("body-parser");
const router         = require('./routes/index');
const router_service = require('./routes/service');
const router_review  = require('./routes/review');
const env            = require('./config/env');


const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('/client/public'));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/', router);
app.use('/service', router_service);
app.use('/review', router_review);

const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port: ${env.PORT}`);
});
  

module.exports = server;