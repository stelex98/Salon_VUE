const express         = require("express");
const bodyParser      = require("body-parser");
const router_authe    = require('./routes/authentication');
const router_service  = require('./routes/service');
const router_review   = require('./routes/review');
const router_discount = require('./routes/discount');
const router_human    = require('./routes/human');
const env             = require('./config/env');
const redis           = require("redis");
const cookieParser    = require('cookie-parser');
const session         = require('express-session');
const RedisStore      = require('connect-redis')(session);


const client  = redis.createClient();
const app     = express();

app.use(cookieParser());
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 6379, client: client, ttl: 600}),
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge:86400000 }
}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no'))
  }
  next()
})

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('/client/public'));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/authentication', router_authe);
app.use('/service', router_service);
app.use('/review', router_review);
app.use('/discount', router_discount);
app.use('/human', router_human);

const server = app.listen(env.PORT, () => {
    console.log(`Server listening on port: ${env.PORT}`);
});
  

module.exports = server;