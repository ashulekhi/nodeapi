const Express = require('express');
const Authservice = require('../authservice')
const router = Express.Router();
const CakeController = require('./cake.controller');

router.get('/api/allcakes' ,CakeController.getCakes);
router.post('/api/addcake', Authservice.isAuthenticated , CakeController.createCake)
router.get('/api/cake/:id',CakeController.CakeDetails)
router.get('/api/searchcakes',CakeController.searchCakes)

module.exports = router;