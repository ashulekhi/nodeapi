const Express = require('express');
var productApi = require("./api/product");
var userApi = require('./api/user')
var cartApi = require("./api/cart")
var PostApi = require('./api/post')
var ExpenseApi = require('./api/expense')
var OrderApi = require('./api/order')
var CakesApi = require('./api/cake')
var CakescartApi =  require('./api/cakecart')
var CakesorderApi = require('./api/cakeorder')

const router = Express.Router();

router.use(productApi);
router.use(userApi);
router.use(cartApi);
router.use(PostApi);
router.use(ExpenseApi)
router.use(OrderApi)
router.use(CakesApi)
router.use(CakescartApi)
router.use(CakesorderApi)

module.exports = router;