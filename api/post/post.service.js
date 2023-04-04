var PostModel = require('./post.model')

exports.createPost = function(data){
    return new Promise(function(resolve,reject){
        data.id = Date.now()
        var Postdata = new PostModel(data)
        Postdata.save().then(function(newpost){
           console.log("new post created" , newpost)
           resolve(newpost)
        },
     function(error){
           console.log("error in post creation",error)
           reject(error)
     })
    })
}