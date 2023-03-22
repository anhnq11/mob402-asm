const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan')
const { engine } = require ('express-handlebars');
const { log } = require('console');
const port = 8080;

const routes = require('./routes');

app.use(morgan('combined'))

app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

routes(app);

app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server started on port " + port);
})