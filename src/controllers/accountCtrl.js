const accModel = require('../models/accModel');
const bcrypt = require("bcrypt");
const session = require('express-session');
let accArrs = [];

exports.getList = async (req, res, next) => {

    let user = req.session.user;
    if (user) {
        if (typeof (req.query.userRole) !== 'undefined') {
            if (req.query.userRole == 'all') {
                accArrs = await accModel.accModel.find();
            }
            else {
                accArrs = await accModel.accModel.find({ role: req.query.userRole })
            }
        }
        else {
            accArrs = await accModel.accModel.find();
        }
        res.render('accounts', {
            showHeader: true,
            accArrs: accArrs,
        });
    }
    else {
        res.redirect('/login')
    }
}

exports.addUser = async (req, res, next) => {

    let user = req.session.user;
    if (user && user.role == 'Admin') {
        try {
            const salt = await bcrypt.genSalt(10);
            const user = new accModel.accModel(req.body);
            user.password = await bcrypt.hash(req.body.password, salt);
            const token = await user.generateAuthToken();
            let new_u = await user.save()
            return res.redirect('/accounts')
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: error.message })
        }
    }
}

// Xóa người dùng
exports.deleteUser = async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        // Admin xóa
        if (user.role == 'Admin') {
            await accModel.accModel.findByIdAndDelete(req.params.id)
            res.redirect('/accounts')
        }
        else {
            // User tự xóa tài khoản
            if (user.role == 'User' && user._id == req.params.id) {
                await accModel.accModel.findByIdAndDelete(req.params.id)
                res.redirect('/accounts')
            }
            else {
                return res.render('accounts', {
                    showHeader: true,
                    accArrs: accArrs,
                    msg: 'Bạn không có quyền thực hiện thao tác này!'
                });
            }
        }
    }
    else {
        res.redirect('/login')
    }
}



