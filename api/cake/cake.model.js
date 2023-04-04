const Mongoose = require('mongoose');
var cakedescription = "Cakes are special. Every birthday, every celebration ends with something sweet, a cake, and people remember. It's all about the memories."

let CakeSchema = new Mongoose.Schema({
    cakeid:{type: Number},
    name:{type:String , required:true},
    description:{type:String,default:cakedescription},
    createdat:{type:Date, default:new Date().getTime()},
    likes:{type:Number,default:10},
    weight:{type:Number , min:0.5, max:5 , required:true},
    ratings:{type:Number, default:4.5},
    reviews:{type:Number,default:100},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    type:{type:String,default:'general'},
    flavour:{type:String,default:'Vanilla'},
    eggless:{type:Boolean,default:true},
    ingredients:{type:[String]},
    owner:{
       email:{type:String,required:true},
       name:{type:String,required:true} 
    }
})

const CakeModel = Mongoose.model('cakes',CakeSchema);

module.exports = CakeModel;