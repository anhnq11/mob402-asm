const express = require('express');
const routes = express.Router();

const controllers = require('../app/controllers/Controller');

routes.use('/products', controllers.products);
routes.use('/selleds', controllers.selled);
routes.use('/typeofprods', controllers.typeofprod);
routes.use('/login', controllers.login);
routes.use('/signin', controllers.signin);
routes.get('/accounts', controllers.accounts);
routes.post('/accounts', controllers.formAddUser);
routes.use('/', controllers.index);


module.exports = routes;
