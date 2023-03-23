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
let listUsers;
let listProducts;
let curUser;

const writelistUsers = function () {
    let data = JSON.stringify(listUsers);
    fs.writeFileSync('json/listUsers.json', data);
}

const readlistUsers = function () {
    let data = fs.readFileSync('json/listUsers.json');
    listUsers = JSON.parse(data);
}

readlistUsers();

const writelistProducts = function () {
    let data = JSON.stringify(listProducts);
    fs.writeFileSync('json/listProducts.json', data);
}

const readlistProducts = function () {
    let data = fs.readFileSync('json/listProducts.json');
    listProducts = JSON.parse(data);
}

readlistProducts();

// Ghi thông tin người dùng hiện tại vào file JSON
const writeCurUser = function () {
    let data = JSON.stringify(curUser);
    fs.writeFileSync('json/curUser.json', data);
}

const readCurUser = function () {
    let data = fs.readFileSync('json/curUser.json');
    curUser = JSON.parse(data);
}

const port = 8080;

// Cấu hình router
const routes = require('./routes');
const { use } = require('./routes/main');

app.use(express.static(path.join(__dirname, './views')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(morgan('combined'))

app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b
    }
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

// Quản lý tài khoản
app.get('/accounts', (req, res) => {
    res.render('accounts', {
        showHeader: true,
        listUsers
    });
});

app.post('/accounts', (req, res) => {
    user = req.body;
    let check = myModule.addUser(user, listUsers, 'account');
    if (check) {
        listUsers.push(user)
        writelistUsers();
        res.redirect('/accounts');
    }
});

// Quản lý sản phẩm
app.get('/products', (req, res) => {
    res.render('products', {
        showHeader: true,
        listProducts
    });
});

app.post('/products', (req, res) => {
    prod = req.body;
    readCurUser();
    prod.author = curUser.fullname;
    listProducts.push(prod)
    writelistProducts();
    res.redirect('/products');
});

app.get('/typeofprods', (req, res) => {
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
    readCurUser();
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
    for (let i = 0; i < listUsers.length; i++) {
        if (listUsers[i].username == user.username && listUsers[i].password == user.password) {
            check = true;
            curUser = listUsers[i];
            writeCurUser();
        }
    }
    listUsers.forEach(element => {
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
    let check = myModule.addUser(user, listUsers);
    if (check) {
        listUsers.push(user)
        writelistUsers();
        res.redirect('/login');
    }
});

app.listen(port, (err) => {
    if (err)
        console.log(err);
    console.log("Server started on port " + port);
})