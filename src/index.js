const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const { log } = require('console');
const cookieParser = require("cookie-parser");
const myModule = require('./module');

let user;
let listUser
let curUser;

const writeListUser = function () {
    let data = JSON.stringify(listUser);
    fs.writeFileSync('listUser.json', data);
}

const readListUser = function () {
    let data = fs.readFileSync('listUser.json');
    listUser = JSON.parse(data);
}

readListUser();

const port = 8080;
const routes = require('./routes');
const { use } = require('./routes/main');

app.use(express.static(path.join(__dirname, './views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(morgan('combined'))

app.engine('hbs', engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

// Trang Home
app.get('/', (req, res) => {
    res.render('home', {
        showHeader: true,
        showHeaderHome: true
    });
});

app.get('/accounts', (req, res) => {
    res.render('accounts', {
        showHeader: true,
        listUser
    });
});

app.post('/accounts', (req, res) => {
    user = req.body;
    let check = myModule.addUser(user, listUser, 'account');
    if (check) {
        listUser.push(user)
        writeListUser();
        res.redirect('/accounts');
    }
});

app.get('/products', (req, res) => {
    res.render('products', {
        showHeader: true,
    });
});

app.get('/typeofproducts', (req, res) => {
    res.render('typeofprods', {
        showHeader: true,
    });
});

app.get('/selleds', (req, res) => {
    res.render('selleds', {
        showHeader: true,
    });
});

app.get('/userInfo', (req, res) => {
    res.render('userInfo', {
        showHeader: true,
        curUser
        });
});

// Đăng nhập hệ thống
app.get('/login', (req, res) => {
    res.render('login', {
        showHeader: false,
    });
});

app.post('/login', (req, res) => {
    user = req.body;
    let check = false;
    for (let i = 0; i < listUser.length; i++) {
        if (listUser[i].username == user.username && listUser[i].password == user.password) {
            check = true;
            curUser = listUser[i];
        }
    }
    listUser.forEach(element => {
        if (user.username === element.username && user.password === element.password) {
            check = true;
        }
    });
    if (check) {
        console.log('Đăng nhập thành công!');
        // Alert thông báo đăng nhập thành công
        res.redirect('/accounts');
    }
    else {
        console.log('Sai tên đăng nhập hoặc mật khẩu!');
        // Alert thông báo tên đăng nhập không tồn tại  
        res.redirect('/login');
    }
});

// Đăng ký tài khoản
app.get('/signin', (req, res) => {
    res.render('signin', {
        showHeader: false,
    });
});

app.post('/signin', (req, res) => {
    user = req.body;
    let check = myModule.addUser(user, listUser);
    if (check) {
        listUser.push(user)
        writeListUser();
        res.redirect('/login');
    }
});

app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server started on port " + port);
})