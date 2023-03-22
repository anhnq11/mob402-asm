const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan')
const { engine } = require ('express-handlebars');
const { log } = require('console');
const port = 8080;

app.use(morgan('combined'))

app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/accounts', (req, res) => {
    res.render('accounts');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/typeofproducts', (req, res) => {
    res.render('typeofprods');
});

app.get('/selleds', (req, res) => {
    res.render('selleds');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server started on port " + port);
})