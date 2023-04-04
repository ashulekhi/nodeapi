const Express = require('express');
const AuthService = require('../authservice')

const router = Express.Router();
const UserController = require('./user.controller');

router.post('/api/login',UserController.login)
router.post('/api/register' , UserController.createUser)
router.get('/api/users',UserController.getUsers)
router.get('/api/logout',UserController.logout)
router.post('/api/deleteuser',UserController.deleteUser)
router.post('/api/recoverpassword',UserController.resetPassword)
router.get('/api/searchuser',UserController.searchUsers)
router.get('/api/verify',UserController.verifyUser)
router.get('/api/getuserdetails',UserController.userDetails)




module.exports = router;