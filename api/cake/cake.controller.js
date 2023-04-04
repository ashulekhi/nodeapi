const CakeService = require("./cake.service")
const CommonService = require('../commonservice');

exports.getCakes = (req,res)=>{
    var skip=req.query.skip||0
    var limit = req.query.limit|| 0
  CakeService.listAll(skip,limit)
  .once('ERROR' , (err)=>{
      let responseObject=CommonService.createResponseObject(null,null,err)
      res.send(responseObject);
  })
  .once('NOT_FOUND' , ()=>{
    let responseObject=CommonService.createResponseObject(null,"No Cakes Found",null)
    res.send(responseObject);
   
  })
.once('SUCCESS' , (Cakes)=>{

    let responseObject=CommonService.createResponseObject(Cakes,"Success",null)
    res.send(responseObject);
 })
}

exports.searchCakes = (req,res)=>{
    
    CakeService.findCakes(req.query.q)
    .once('Success',(cakes)=>{
        res.send({
            data:cakes
        })
    })
    .once('Error',(error)=>{
        res.send({
            error:"Internal Server Error"
        })
    })
}

exports.CakeDetails = (req,res)=>{
    var queryObj = {
        cakeid : parseInt(req.params.id) 
    }
    CakeService.getcake(queryObj)
    .once('ERROR',(err)=>{
        let responseObject=CommonService.createResponseObject(null,null,err)
    res.send(responseObject);
    })
    .once('SUCCESS',(Cake)=>{
        let responseObject=CommonService.createResponseObject(Cake,"Success",null)
        res.send(responseObject);
    })
    
}

exports.createCake = (req,res)=>{
    CakeService.create(req.body,(err,Cake)=>{
        if(err){
            let responseObject=CommonService.createResponseObject(null,null,err)
    res.send(responseObject);
        }
        else{
            let responseObject=CommonService.createResponseObject(Cake,"Success",null)
        res.send(responseObject);
        }
    })
}