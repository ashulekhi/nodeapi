var Mongoose  = require('mongoose')

var PostSchema  =new Mongoose.Schema({
    id:{type:Number,required:true,unique:true},
    text:{type:String,required:true},
    date:{type:Date,default:new Date()},
    image:{type:String},
    comments:{type:Number,default:0},
    likes:{type:Number,default:0},
    owner:{
        email:{type:String,required:true},
        name:{type:String,required:true},
        imageUrl:{type:String,required:true},  
    }
})
var PostModel = Mongoose.model('post',PostSchema)

module.exports = PostModel
