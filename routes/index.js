var express = require('express');
var router = express.Router();
const StuentDB=require('../src/mongodb/ClassDB');
const UserDB = require('../src/mongodb/DBUser');
const ClientDB = require('../src/mongodb/DBClient');
const ProductDB = require('../src/mongodb/DBProduct');
// request, co cac tham so de sever tra ve cua client yeu cau
// res những cái sever trả về lại client.

// Get Login Page
router.get('/login', function(req, res, next){
  // trả về view login
  res.render('login', {title: 'Login'});
});

//Get Edit Product Page
router.get('/edit-product', function(req,res,next){
  res.render('edit-product', {title : 'Edit Product'});
});

//Get Edit Client Page
router.get('/edit-client', function(req,res,next){
  res.render('edit-client', {title : 'Edit Client'});
});

// api login
router.post('/api/login',async function(req,res,next) {
   const username  =req.body.username;
   const password = req.body.password;

   const check = await UserDB.findUser(username,password);
   if(check){
    res.redirect("/home")
   } else{
    res.json({
      mess:'dang nhap ko thanh cong'
    })
   }
});

//api them lop
router.post('/api/addsv',async function(req, res,next){
  const name= req.body.name;
  const countStudent = req.body.count_student;
  await StuentDB.addST(name,countStudent);
  // object
  res.json({
    name:name,
    count_sv:countStudent
  })
});

//api register user
router.post('/api/register_user', async function(req,res,next){
  try {
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    await UserDB.addUser(username,password,address,phone,email);
    res.json({
     message:'dang ky thanh cong'
    })
  } catch(e){
    res.json({
      message:"dang ky ko thanh cong"
    })
  }
})

//api client
router.post('/api/client', async function(req,res,next){
  try{
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    await ClientDB.addClient(username,password,fullname,phone,address,email);
    res.json({
      username:username,
      password:password,
      fullname:fullname,
      phone:phone,
      address:address,
      email:email
    })
  }catch(e){
    res.json({
      message:"dang ky ko thanh cong"
    })
  } 
})

//api addProduct
router.post('/api/product/add', async function(req,res, next){
  try{
    console.log(req.body)
    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;
    await ProductDB.addProduct(name,price,count);
    res.json({
      message:'dang ky thanh cong'
     })
  }catch(e){
    res.json({
      message:"dang ky ko thanh cong"
    })
  }
})


//api addProduct
router.post('/api/product/edit', async function(req,res, next){
  try{
    console.log("test edit",req.body);
    
    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;
   
    await ProductDB.updateProduct({
      id:req.body.id},req.body);
    res.json({
      message:'dang ky thanh cong'
     })
  }catch(e){
    res.json({
      message:"dang ky ko thanh cong"
    })
  }
})

// Get Register Page
router.get('/register', function(req, res, next){
  res.render('register', {title: 'Register'});
});

/* GET home page. */
router.get('/home', async function(req, res, next) {
  const listClient = await ClientDB.getListClient();
  const listProduct = await ProductDB.getListProducts();
  res.render('index', { title: 'Express', listClient:listClient, listProduct:listProduct});
});



/* GET Client page. */
router.get('/clients', async function(req, res, next) {
  const listClient = await ClientDB.getListClient();
  console.log("list client", listClient)
  res.render('client', { title: 'Client', listClient:listClient});
});

// Get Product page//
router.get('/products', async function(req, res, next){
  const listProduct = await ProductDB.getListProducts();
  console.log("list products:",listProduct)
  res.render('product', { title: 'Product',listProduct:listProduct});
});


// Get Product page//
router.get('/api/products', async function(req, res, next){
  const listProduct = await ProductDB.getListProducts();
  console.log("list products:",listProduct)
  res.json({
    data:listProduct
  })
});


module.exports = router;
