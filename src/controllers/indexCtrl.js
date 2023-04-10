const accModel = require('../models/accModel');
const bcrypt = require("bcrypt");
var request = require('request');
const session = require('express-session');

exports.index = (req, res, next) => {
    res.render('home', {
        showHeader: true,
        showHeaderHome: true
    });
}

// Đăng nhập hệ thống
exports.toLogin = (req, res) => {
    req.session.user = null;
    res.render('login', {
        showHeader: false,
    });
}

exports.login = async (req, res, next) => {

    try {
        const user = await accModel.accModel.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({error: 'Sai thông tin đăng nhập'})
        }
        else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordMatch) {
                return res.status(401).json({error: 'Sai mật khẩu'})
            }
        }
        const token = await user.generateAuthToken()
        // request.get({
        //     headers: { 'Authorization': 'JWT ' + token }
        //     , url: 'http://localhost:8080/accounts'
        // });

        req.session.user = user;
        
        res.setHeader('Authorization', token);
        return res.redirect('/accounts')

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }
}

// Đăng ký tài khoản
exports.signin = (req, res) => {
    res.render('signin', {
        showHeader: false,
    });
};

exports.reg = async (req, res, next) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const user = new accModel.accModel(req.body);
        user.password = await bcrypt.hash(req.body.password, salt);
        const token = await user.generateAuthToken();
        let new_u = await user.save()
        return res.render('login')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: error.message })
    }

}

exports.userInfo = (req, res) => {
    let user = req.session.user;
    res.render('userInfo', {
        showHeader: true,
        user
    });
};

exports.logout = async (req, res, next) => {

    try {
        console.log(req.user);
        req.user.token = null;
        await req.user.save()
        return res.status(200).json({ msg: 'Đăng xuất thành công' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }

}
