var Mongoose =require('mongoose')
var Schema = Mongoose.Schema

var CakeorderSchema = new Schema({
    orderid:{type:Number,required:true},
    pending:{type:Boolean,default:true},
    compeleted:{type:Boolean,default:false},
    email:{type:String,required:true},
    price:{type:Number,required:true},
    orderdate:{type:Date,default:new Date()},
    name:{type:String,required:true},
    mode:{type:String,default:'cash'},
    address:{type:String,required:true},
    city:{type:String,required:true},
    phone:{type:String,required:true},
    pincode:{type:Number,required:true},
    cakes:{type:Array,required:true}
})
module.exports=Mongoose.model('cakeorders',CakeorderSchema)