var express = require('express');
var router = express.Router();
const productsCtrl = require('../controllers/productsCtrl');

router.get('/products', productsCtrl.getListPrd);
router.get('/products/delete/:id', productsCtrl.deletePrd);
router.get('/products/update/:id', productsCtrl.getEdtPrd);
router.post('/products/update/:id', productsCtrl.postEdtPrd);
router.post('/products', productsCtrl.addPrd);

router.get('/categories', productsCtrl.getListCats);
router.get('/categories/delete/:id', productsCtrl.delCat);
router.get('/categories/update/:id', productsCtrl.updateCat);
router.post('/categories', productsCtrl.addCats);

module.exports = router;
