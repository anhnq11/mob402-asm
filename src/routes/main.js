const express = require('express');
const routes = express.Router();

const controllers = require('../app/controllers/Controller');

routes.use('/products', controllers.products);
routes.use('/selleds', controllers.selled);
routes.use('/typeofprods', controllers.typeofprod);
routes.use('/login', controllers.login);
routes.use('/signin', controllers.signin);
routes.use('/accounts', controllers.accounts);
routes.use('/', controllers.index);


module.exports = routes;
