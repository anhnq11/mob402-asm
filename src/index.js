const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session');
const port = 8080;

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');
var productsRouter = require('./routes/products');
 
var app = express();
app.use(express.static(path.join(__dirname, './views')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'anhnq11',
    resave: false,
    saveUninitialized: false
  }));
  

app.engine('hbs', engine({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        sum: (a, b) => a + b
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);
app.use('/products', productsRouter);

app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server started on port " + port);
})