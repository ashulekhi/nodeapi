var PostService = require('./post.service')

exports.addPost = function(req,res){
    PostService.createPost(req.body).then(function(data){
        res.send({
            message:'SUCCESS',
            code:200
        })
     },function(error){
         console.log("error in controller" , error);
      res.send({
          message:'ERROR',
          code:500
      })
     })
}


exports.getMyPosts = function(){

}

exports.getPosts = function(){

}