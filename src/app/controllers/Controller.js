class Controllers{

    index(req, res) {
        res.render('home', {
            showHeader: true,
        }); 
    }

    products(req, res) {
        res.render('products', {
            showHeader: true,
        }); 
    }

    selled(req, res) {
        res.render('selleds', {
            showHeader: true,
        }); 
    }

    typeofprod(req, res) {
        res.render('typeofprods', {
            showHeader: true,
        }); 
    }

    login(req, res) {
        res.render('login', {
            showHeader: false,
        }); 
    }

    signin(req, res) {
        res.render('signin', {
            showHeader: false,
        }); 
    }

    accounts(req, res) {
        res.render('accounts', {
            showHeader: true,
        }); 
    }
    
    formAddUser = (req, res, next) => {
        console.log("Dữ liệu post");
        console.log(req.body);
        // res.send(req.body);
    }
}

module.exports = new Controllers();

