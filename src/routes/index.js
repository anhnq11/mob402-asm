var express = require('express');
var router = express.Router();
const indexCtrl = require('../controllers/indexCtrl');

router.get('/login', indexCtrl.toLogin);
router.post('/login', indexCtrl.login);

router.get('/signin', indexCtrl.signin);
router.post('/signin', indexCtrl.reg);

router.get('/userInfo', indexCtrl.userInfo);

router.get('/', indexCtrl.index);

module.exports = router;
