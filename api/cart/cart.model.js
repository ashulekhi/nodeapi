const Mongoose = require('mongoose');


let CartSchema = new Mongoose.Schema({
    email:{type:String,required:true},
    productid:{type:String,required:true},
    name:{type:String , required:true},
    quantity:{type:Number , default:1},
    price:{type:Number,required:true},
    image:{type:String,default:'No Image Available'},
    createdat:{type:Date , default:new Date().getTime()},   
})

var CartModel = Mongoose.model('cart',CartSchema)

module.exports = CartModel