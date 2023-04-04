const Express = require('express');
const AuthService = require('../authservice')

const router = Express.Router();
const CakeCartController = require('./cakecart.controller');


router.post("/api/addcaketocart", AuthService.isAuthenticated, CakeCartController.addToCart)
router.get("/api/admincart" ,  CakeCartController.getAdminCartItems)
router.get("/api/cakecart" , AuthService.isAuthenticated, CakeCartController.getCartItems)
router.post("/api/removeonecakefromcart", AuthService.isAuthenticated, CakeCartController.removeFromCart)
router.post("/api/removecakefromcart", AuthService.isAuthenticated, CakeCartController.removeWholeCakeitem)
router.post("/api/clearcart", AuthService.isAuthenticated, CakeCartController.emptyCart)


module.exports = router;