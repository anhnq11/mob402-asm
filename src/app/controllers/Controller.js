class Controllers{

    index(req, res) {
        res.render('home'); 
    }

    products(req, res) {
        res.render('products'); 
    }

    selled(req, res) {
        res.render('selleds'); 
    }

    typeofprod(req, res) {
        res.render('typeofprods'); 
    }

    login(req, res) {
        res.render('login'); 
    }

    signin(req, res) {
        res.render('signin'); 
    }

    accounts(req, res) {
        res.render('accounts'); 
    }
}

module.exports = new Controllers();
