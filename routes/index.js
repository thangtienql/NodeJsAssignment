var express = require('express');
var router = express.Router();

// request, co cac tham so de sever tra ve

// Get Login Page
router.get('/login', function(req, res, next){
  res.render('login', {title: 'Login'});
});

// api login
router.post('/api/login',function(req,res,next) {
   const username  =req.body.username;
   const password = req.body.password;
   if(username=="admin" && password=="admin123"){
    res.redirect("/home")
   } else{
    res.json({
      mess:'dang nhap ko thanh cong'
    })
   }
});

// Get Register Page
router.get('/register', function(req, res, next){
  res.render('register', {title: 'Register'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Client page. */
router.get('/clients', function(req, res, next) {
  const listClient=[]
  res.render('client', { title: 'Client' ,listClient:listClient});
});

// Get Product page//
router.get('/products', function(req, res, next){
  res.render('product', { title: 'Product'});
});
module.exports = router;
