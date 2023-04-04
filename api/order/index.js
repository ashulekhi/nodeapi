const Express = require('express');

const router = Express.Router();
const OrderController = require('./ordercontroller')


router.post("/api/addorder",OrderController.addorder)
router.post("/api/orders",OrderController.myorders)



module.exports = router;
