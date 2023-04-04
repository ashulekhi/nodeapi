const CakeCartService = require('./cakecart.service');

exports.getCartItems = (req,res)=>{
    console.log("request in controller for fetching cart items , req.email" , req.email)
   CakeCartService.findCartItems(req.email).then((result)=>{
    res.send({
        data:result,
        message:"items in cart"
    })
   },()=>{
    res.status(500).send({
    })
   })
   


}


exports.getAdminCartItems = (req,res)=>{
    console.log("req body " , req.body)
   CakeCartService.getAllCartItems()
   .once('ERROR',(err)=>{
    res.send({
        err:err,
        message:"Error in adding to cart"
    })
})
.once('SUCCESS',(cartitems)=>{
 res.send({
     data:cartitems,
     message:"items in cart"
 })
})
.once('NOT_FOUND',(data)=>{
    res.send({
        data:data,
        message:"your cart is empty"
    })
})

}


exports.addToCart = (req,res)=>{
   CakeCartService.create(req.body)
   .once('ERROR',(err)=>{
       res.send({
           err:err,
           message:"Error in adding to cart"
       })
   })
   .once('SUCCESS',(cartitem)=>{
    res.send({
        data:cartitem,
        message:"Added to cart"
    })
})
}

exports.removeWholeCakeitem = (req,res)=>{
    CakeCartService.removeWholeitem(req.body)
    .once('ERROR',(err)=>{
        res.send({
            err:err,
            message:"Some Error in removing items"
        })
    })
    .once('SUCCESS',(cartitem)=>{
     res.send({
         message:"Removed whole cake  item from cart"
     })
    })  
}

exports.removeFromCart = (req,res)=>{
    CakeCartService.removeItem(req.body)
    .once('ERROR',(err)=>{
        res.send({
            err:err,
            message:"Some Error in removing items"
        })
    })
    .once('SUCCESS',(cartitem)=>{
     res.send({
         message:"Removed  item from cart"
     })
    })
}

exports.emptyCart = (req,res)=>{
    CakeCartService.removeAll(req.body)
    .once('ERROR',(err)=>{
        res.send({
            err:err,
            message:"Some Error in removing items"
        })
    })
    .once('SUCCESS',(cartitem)=>{
     res.send({
         message:"Removed all  item from cart"
     })
    })
}

