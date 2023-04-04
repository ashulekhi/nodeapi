const Express = require('express');
const AuthService = require('../authservice')

const router = Express.Router();
const CakeorderController = require('./cakeorder.controller')


router.post("/api/addcakeorder",AuthService.isAuthenticated,CakeorderController.addCakeorder)
router.get("/api/cakeorders",AuthService.isAuthenticated,CakeorderController.myCakeorders)



module.exports = router;
