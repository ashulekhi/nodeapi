const Mongoose = require('mongoose');

let ProductSchema = new Mongoose.Schema({
    productid:{type: Number},
    name:{type:String , required:true},
    quantity:{type:Number , default:10},
    description:{type:String,default:'This product is so cool'},
    createdat:{type:Date, default:new Date().getTime()},
    brand:{type:String, required:true , default:'LKM'},
    ratings:{type:Number, default:4.5},
    reviews:{type:Number,default:100},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,default:'General'},
    seller:{type:String,default:'Lkmcart'},
    owner:{
       email:{type:String,required:true},
       name:{type:String,required:true} 
    }
})

// ProductSchema.virtual('timestamp_ms').get(function() {
//     return this.productId.getTime();
//   });


const ProductModel = Mongoose.model('product',ProductSchema);

module.exports = ProductModel;