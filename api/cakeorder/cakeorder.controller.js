var  Cakeordermodel=require('./cakeorder.model')
var Cakecartmodel=require("../cakecart/cakecart.model")
var mailer=require('../order/mailer')
exports.addCakeorder=function(req,res){
    var details=req.body
    if(details.email&&details.name&&details.price&&details.phone&&details.address&&details.city&&details.pincode&&details.cakes.length>0)
    {   
        details.orderid=Date.now()
        var Cakeorderdata= new Cakeordermodel(details)
         Cakeorderdata.save(function(error,newcakeorder){
            if(newcakeorder){
                console.log("order placed")
                Cakecartmodel.remove({email:details.email},function(error){
                    if(error){
                        res.status(500).send({
                            error:"Internal Server Error"                       
                         })
                    }
                    else{
                        res.send({
                            messageg:"order placed",
                            order:newcakeorder
                        })
                    }
                })
            }
            else{
                console.log("error in placing order",error)
                res.send({
                    code:500,
                    error:"error in placing order"
                })
            }
        })
      
    }
    else{
        res.send({
            error:"insufficient details",
            code:404
        })
    }
}
// exports.getorder=function(req,res){
//     if(req.body.oid){
//         ordermodel.findOne({oid:req.body.oid},function(error,order){
//             if(error){
//                 res.send({
//                     code:500,
//                     error:'error in finding order'
//                 })
//             }
//             else if(order){
//                 res.send({
//                     code:200,
//                     msg:'order found successfully',
//                     order:order
//                 })
//             }
//             else{
//                 res.send({
//                     code:404,
//                     error:'invalid details'
//                 })
//             }
//         })
//     }
//     else{
//         res.send({
//             error:'insufficient details'
//         })
//     }
// }
exports.myCakeorders=function(req,res){
    if(req.body.email){
        Cakeordermodel.find({email:req.body.email},function(error,cakeorders){
        if(cakeorders.length>0){
            res.send({
                cakeorders:cakeorders,
            })
        }
        else if(cakeorders.length<=0){
            res.send({
                error:'no order found'
            })
        }
        else{
            res.status(500).send({
                error:'error in finding orders',
            })
        }
    })
}
else{
    res.status(500).send({
        error:'Error in finding orders',
    })
}
}

// exports.allorders=function(req,res){
//     ordermodel.find({},function(error,orders){
//         if(orders.length>0){ 
//             res.send({
//                 code:200,
//                 orders:orders
//             })
//          }
//          else if(orders.length<=0){
//              res.send({
//                  code:404,
//                  error:"no order found"
//              })
//          }

//          else{
//              res.send({
//                  code:500,
//                  error:"internal server error"
//              })
//          }
//     })
   

    
// }