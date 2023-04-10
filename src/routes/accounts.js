var express = require('express');
var router = express.Router();
const accountCtrl = require('../controllers/accountCtrl');
const mdw = require('../mdw/auth');

router.get('/', accountCtrl.getList);
router.post('/', accountCtrl.addUser);
router.get('/delete/:id', accountCtrl.deleteUser);



module.exports = router;
