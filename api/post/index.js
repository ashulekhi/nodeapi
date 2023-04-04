const Express = require('express');

const router = Express.Router();
const PostController = require('./post.controller')


router.post("/api/addpost",PostController.addPost)


module.exports = router;