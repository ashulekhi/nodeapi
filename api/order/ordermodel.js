var Mongoose =require('mongoose')
var Schema = Mongoose.Schema

var orderSchema = new Schema({
    orderid:{type:Number,required:true},
    pending:{type:Boolean,default:true},
    compeletd:{type:Boolean,default:false},
    email:{type:String,required:true},
    price:{type:Number,required:true},
    name:{type:String,required:true},
    mode:{type:String,default:'cash'},
    area:{type:String,required:true},
    city:{type:String,required:true},
    phone:{type:String,required:true},
    pincode:{type:Number,required:true},
    items:{type:Array,required:true}
})
module.exports=Mongoose.model('order',orderSchema)