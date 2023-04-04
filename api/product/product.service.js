const ProductModel = require("./product.model");

var EventEmitter = require('events');


exports.getProduct = (data)=>{
    let emitter = new EventEmitter();
    console.log(data);
if(data){
    ProductModel.findOne(data ,(err,product)=>{
        console.log("all product details" ,product , err);

      if(product){
          return emitter.emit('SUCCESS' , product)
      }
      else{
          return emitter.emit('ERROR' , err);
          }
    })
}
return emitter
}

exports.listAll = (skip,limit)=>{

    let emitter = new EventEmitter();
    let query ={};
    let projection = {
        name:1,
        productid:1,
        image:1,
        price:1,
        _id:0
    }

    console.log("here we have to get produvcts")
    skip = Number.parseInt(skip);
    limit = Number.parseInt(limit);

    ProductModel.find(query,projection,{skip:skip,limit:limit},(err,products)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            if(products.length>0){
               return emitter.emit('SUCCESS',products)
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })

    return emitter
}


exports.create = (data , callback)=>{
    console.log("here we will create the product" , data);
    if(data){
        
        var Product =new ProductModel(data);
        Product["productid"] = Date.now();
        Product["owner"]={email:data.user.email,name:data.user.name}
        Product.save((err,product)=>{
            if(err){
                console.log("error in creating product" , err);
                callback(err,null);
            }
            else{
                console.log("new product created" ,product)
                callback(null,product)
            }
         })
    }
    else{
        console.log("No data found for product");
    }
}