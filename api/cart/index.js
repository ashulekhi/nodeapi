const Express = require('express');
const AuthService = require('../authservice')

const router = Express.Router();
const CartController = require('./cart.controller');


router.post("/api/addtocart",CartController.addToCart)
router.post("/api/cart" ,CartController.getCartItems)
router.post("/api/removefromcart",CartController.removeFromCart)
router.post("/api/emptycart", CartController.emptyCart)


module.exports = router;