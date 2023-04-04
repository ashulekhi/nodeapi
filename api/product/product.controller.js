const ProductService = require("./product.service")
const CommonService = require('../commonservice');

exports.getProducts = (req,res)=>{
    var skip=req.query.skip||0
    var limit = req.query.limit|| 0
  ProductService.listAll(skip,limit)
  .once('ERROR' , (err)=>{
      let responseObject=CommonService.createResponseObject(null,null,err)
      res.send(responseObject);
  })
  .once('NOT_FOUND' , ()=>{
    let responseObject=CommonService.createResponseObject(null,"No Products Found",null)
    res.send(responseObject);
   
  })
.once('SUCCESS' , (products)=>{

    let responseObject=CommonService.createResponseObject(products,"Success",null)
    res.send(responseObject);
 })
}

exports.productDetails = (req,res)=>{
    var queryObj = {
        productid : parseInt(req.params.id) 
    }
    ProductService.getProduct(queryObj)
    .once('ERROR',(err)=>{
        let responseObject=CommonService.createResponseObject(null,null,err)
    res.send(responseObject);
    })
    .once('SUCCESS',(product)=>{
        let responseObject=CommonService.createResponseObject(product,"Success",null)
        res.send(responseObject);
    })
    
}

exports.createProduct = (req,res)=>{
    ProductService.create(req.body,(err,product)=>{
        if(err){
            let responseObject=CommonService.createResponseObject(null,null,err)
    res.send(responseObject);
        }
        else{
            let responseObject=CommonService.createResponseObject(product,"Success",null)
        res.send(responseObject);
        }
    })
}