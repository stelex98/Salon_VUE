const express        = require("express");
const bodyParser     = require("body-parser");
const router         = require('./routes/index');
const router_service = require('./routes/service');
const router_review  = require('./routes/review');
const router_authorization = require('./routes/authorization');
const env            = require('./config/env');
const redis          = require("redis");
const cookieParser   = require('cookie-parser');
const session        = require('express-session');
const RedisStore     = require('connect-redis')(session);


const client  = redis.createClient();
const app     = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('/client/public'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(session({
    store: new RedisStore({ host: 'localhost', port: 6379, client: client,ttl: 600}),
    secret: 'supersecret',
    resave: true,
    saveUninitialized: false
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no'))
  }
  next()
})

app.use('/', router);
//app.use('/authorization', router_authorization);
app.use('/service', router_service);
app.use('/review', router_review);


const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port: ${env.PORT}`);
});
  

module.exports = server;