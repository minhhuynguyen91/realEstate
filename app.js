const express = require('express');
const app = express();
const routes = require('./web/router/index');
const bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');

var cookieParser = require('cookie-parser');
const session = require('express-session');
const redis_client = require('./config/web/redis')

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 3600000}
}));


app.use('/', routes);
app.use('/products', routes);
app.use('/login', routes);


app.use(cookieParser());

module.exports = app;