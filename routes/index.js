var express = require('express');
var router = express.Router();
const StuentDB = require('../src/mongodb/ClassDB');
const UserDB = require('../src/mongodb/DBUser');
const ClientDB = require('../src/mongodb/DBClient');
const ProductDB = require('../src/mongodb/DBProduct');
// request, co cac tham so de sever tra ve cua client yeu cau
// res những cái sever trả về lại client.

// Get Login Page
router.get('/login', function (req, res, next) {
  // trả về view login
  res.render('login', { title: 'Login' });
});



// api delete client
router.post('/api/product/delete/:id', async function (req, res, next) {
  try {
    const { id = "" } = req.params;
    const kq = await ProductDB.deleteProduct(id);
    res.render('ketqua', { title: 'Xoa product thanh cong' })
  } catch (e) {
    res.render('ketqua', { title: 'Xoa product khong thanh cong' })
  }
});


//Get Edit Product Page
router.get('/edit-product/:id', async function (req, res, next) {
  const { id = "" } = req.params;
  let p;
  try {
    p = await ProductDB.getProcutById(id);
    console.log('client:', p);;
  } catch (error) {
    console.log("error:", error);
  }
  res.render('edit-product', { title: 'Edit Product', product: p });
});

//Get Edit Client Page
router.get('/edit-client/:id', async function (req, res, next) {
  const { id = "" } = req.params;
  let client;
  try {
    client = await ClientDB.findById(id);
    console.log('client:', client);;
  } catch (error) {
    console.log("error:", error);
  }
  res.render('edit-client', { title: 'Edit Client', client: client });
});


// api edit product
router.post('/api/product/edit/:id', async function (req, res, next) {
  try {
    const { id = "" } = req.params;
    console.log("test edit", req.body);

    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;

    await ProductDB.updateProduct(id, req.body);
    res.render('ketqua', { title: 'Cap nhat san pham thanh cong' })
  } catch (e) {
    res.render('ketqua', { title: 'Cap nhat san pham khong thanh cong' })
  }
});


// api edit client
router.post('/api/client/edit/:id', async function (req, res, next) {
  try {
    const { id = "" } = req.params;
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    const kq = await ClientDB.updateClientById(id, { username, password, fullname, phone, address, email });
    res.render('ketqua', { title: 'Cap nhat client thanh cong' })
  } catch (e) {
    res.render('ketqua', { title: 'Cap nhat client khong thanh cong' })
  }
});


// api delete client
router.post('/api/client/delete/:id', async function (req, res, next) {
  try {
    const { id = "" } = req.params;
    const kq = await ClientDB.deleteClient(id)
    res.render('ketqua', { title: 'Xoa client thanh cong' })
  } catch (e) {
    res.render('ketqua', { title: 'Xoa client khong thanh cong' })
  }
});


// api login
router.post('/api/login', async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const check = await UserDB.findUser(username, password);
  if (check) {
    res.redirect("/home")
  } else {
    res.json({
      mess: 'dang nhap ko thanh cong'
    })
  }
});


// api login
router.post('/api/login/client', async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const check = await ClientDB.findClient(username, password);
  console.log('check client:', check);
  if (check) {
    res.json({
      mess: 'dang nhap thanh cong'
    })
  } else {
    res.status(401).json({
      mess: 'dang nhap ko thanh cong'
    })
  }
});

//api them lop
router.post('/api/addsv', async function (req, res, next) {
  const name = req.body.name;
  const countStudent = req.body.count_student;
  await StuentDB.addST(name, countStudent);
  // object
  res.json({
    name: name,
    count_sv: countStudent
  })
});

//api register user
router.post('/api/register_user', async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    await UserDB.addUser(username, password, address, phone, email);
    res.json({
      message: 'dang ky thanh cong'
    })
  } catch (e) {
    res.json({
      message: "dang ky ko thanh cong"
    })
  }
})

//api add, signup client
router.post('/api/client', async function (req, res, next) {
  try {
    const { hide = '' } = req.body;
    const username = req.body.username;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const phone = req.body.phone;
    const address = req.body.address;
    const email = req.body.email;
    await ClientDB.addClient(username, password, fullname, phone, address, email);
    if (hide == '') {
      res.json({
        message: "dang ky thanh cong"
      })
    } else {
      res.render('ketqua', { title: 'Them khach hang thanh cong' })
    }

  } catch (e) {
    if (hide == '') {
      res.status(401).json({
        message: "dang ky ko thanh cong"
      })
    } else {
      res.render('ketqua', { title: 'Them khach hang ko thanh cong' })
    }
  }
})

//api addProduct
router.post('/api/product/add', async function (req, res, next) {
  try {
    console.log(req.body)
    const name = req.body.name;
    const price = req.body.price;
    const count = req.body.count;
    await ProductDB.addProduct(name, price, count);
    res.render('ketqua', { title: 'Them san pham thanh cong' })

  } catch (e) {
    res.render('ketqua', { title: 'Them san pham khong thanh cong' })
  }
})


// Get Register Page
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET home page. */
router.get('/home', async function (req, res, next) {
  const listClient = await ClientDB.getListClient();
  const listProduct = await ProductDB.getListProducts();
  res.render('index', { title: 'Express', listClient: listClient, listProduct: listProduct });
});



/* GET Client page. */
router.get('/clients', async function (req, res, next) {
  const listClient = await ClientDB.getListClient();
  console.log("list client", listClient)
  res.render('client', { title: 'Client', listClient: listClient });
});

// Get Product page//
router.get('/products', async function (req, res, next) {
  const listProduct = await ProductDB.getListProducts();
  console.log("list products:", listProduct)
  res.render('product', { title: 'Product', listProduct: listProduct });
});


// Get Product page//
router.get('/api/products', async function (req, res, next) {
  const listProduct = await ProductDB.getListProducts();
  console.log("list products:", listProduct)
  res.json({
    data: listProduct
  })
});


module.exports = router;
