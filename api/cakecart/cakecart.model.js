const Mongoose = require('mongoose');


let CakeCartSchema = new Mongoose.Schema({
    email:{type:String,required:true},
    cakeid:{type:String,required:true},
    name:{type:String , required:true},
    weight:{type:Number,required:true},
    quantity:{type:Number , default:1},
    price:{type:Number,required:true},
    message:{type:String},
    image:{type:String,default:'No Image Available'},
    createdat:{type:Date , default:new Date().getTime()},   
})

CakeCartSchema.index({email:1,cakeid:1},{unique:true})

var CakeCartModel = Mongoose.model('cakecart',CakeCartSchema)

module.exports = CakeCartModel


// /addcaketocart   method:post

// {email,cakeid,name,price,weight,image}

//headers : authtoken