var fs = require('fs');
const catsModel = require('../models/catsModel');
const prodModel = require('../models/prodModel');
const session = require('express-session');
let listPrd
let listCats
let catObj = ''

exports.getListPrd = async (req, res, next) => {

    let user = req.session.user
    if (user) {
        listCats = await catsModel.find();

        if (typeof (req.query.loaisp) !== 'undefined') {
            if (req.query.loaisp == 'all') {
                listPrd = await prodModel.find()
            }
            else {
                listPrd = await prodModel.find({ lsp: req.query.loaisp })
            }
        }
        else {
            listPrd = await prodModel.find();
        }
        res.render('products', {
            showHeader: true,
            listCats: listCats,
            listPrd: listPrd
        });
    }
    else {
        res.redirect('/login')
    }

};

exports.addPrd = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        let prd = req.body;
        prd.author = user.fullname
        console.log(prd);
        prodModel.create(prd);
        res.redirect('/products/products')
    }
    else {
        res.redirect('/login')
    }

};

exports.deletePrd = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        await prodModel.findByIdAndDelete(req.params.id);
        res.redirect('/products/products')
    }
    else {
        res.redirect('/login')
    }
};

let edtPrdId
exports.getEdtPrd = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        let edtPrd = await prodModel.findById(req.params.id);
        edtPrdId = req.params.id;
        res.render('editprod',{
            showHeader: true,
            edtPrd: edtPrd,
            listCats: listCats,
        });
    }
    else {
        res.redirect('/login')
    }

};

exports.postEdtPrd = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        let edtPrd = await prodModel.findByIdAndUpdate({_id: req.params.id}, req.body);
        console.log(edtPrd);
        res.redirect('/products/products');
    }
    else {
        res.redirect('/login')
    }
};

exports.getListCats = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        // Tất cả LSP
        let catsArrs = await catsModel.find();
        // Check điều kiện lọc để hiển thị danh sách
        let catsList;
        if (typeof (req.query.loaisp) !== 'undefined') {
            if (req.query.loaisp === 'all') {
                catsList = catsArrs;
            }
            else {
                catsList = await catsModel.find({ _id: req.query.loaisp });
            }
        }
        else {
            catsList = catsArrs;
        }
        res.render('categories', {
            showHeader: true,
            catsArrs: catsArrs,
            catsList: catsList
        });
    }
    else {
        res.redirect('/login')
    }

};

exports.updateCat = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        let catsArrs = await catsModel.find();
        catObj = await catsModel.findById(req.params.id);
        res.render('categories', {
            showHeader: true,
            catsArrs,
            catObj
        });
    }
    else {
        res.redirect('/login')
    }
};

exports.addCats = async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        if (catObj == '') {
            catsModel.create(req.body);
        }
        else {
            await catsModel.findByIdAndUpdate({ _id: catObj.id }, req.body)
            catObj = '';
        }
        res.redirect('/products/categories');
    }
    else {
        res.redirect('/login')
    }
};

exports.delCat = async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        await catsModel.findByIdAndDelete(req.params.id);
        res.redirect('/products/categories');
    }
    else {
        res.redirect('/login')
    }
};