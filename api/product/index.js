const Express = require('express');
const Authservice = require('../authservice')
const router = Express.Router();
const ProductController = require('./product.controller');

router.get('/api/allproducts' ,ProductController.getProducts);
router.post('/api/createproduct', Authservice.isAuthenticated , ProductController.createProduct)
router.get('/api/product/:id',ProductController.productDetails)
module.exports = router;