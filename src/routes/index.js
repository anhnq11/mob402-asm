const router = require('./main');


function routes(app) {

    app.use('/', router);

}

module.exports = routes;
