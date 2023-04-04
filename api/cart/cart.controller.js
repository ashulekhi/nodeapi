const CartService = require('./cart.service');

exports.getCartItems = (req,res)=>{
   CartService.list(req.body)
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
   CartService.create(req.body)
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

exports.removeFromCart = (req,res)=>{
    CartService.removeItem(req.body)
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
    CartService.removeAll(req.body)
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

