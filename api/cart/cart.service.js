var EventEmitter = require('events');
var CartModel = require('./cart.model');

exports.list = (data)=>{
   let emitter = new EventEmitter();
   if(data){
    CartModel.find(data,(err,cartitems)=>{
        if(err){
          return emitter.emit('ERROR',err)         
        }
        else{
            console.log('data received from cart items' , cartitems)
            if(cartitems && cartitems.length>0){
                return emitter.emit('SUCCESS' , cartitems)
            }
            else{
                return emitter.emit('NOT_FOUND',[])
            }
        }
      })
   }
   else{
       return emitter.emit('ERROR')
   }
  
   return emitter
}


exports.create = (data)=>{
    console.log("this we have to add into cart",data);
    let emitter = new EventEmitter();
    if(data){
        CartModel.findOne(data,(err,item)=>{
            if(!item){
                var cartObj = new CartModel(data);
                cartObj.save((err,newcartobj)=>{
                    if(err){
                     return emitter.emit('ERROR',err)
                    }
                    else{
                       return emitter.emit('SUCCESS',newcartobj)
                    }
                })
            }
            else{
                return emitter.emit('ERROR',{error:"Item already in cart"})
            }
            if(err){
                return emitter.emit('ERROR',err);
            }
        })
        
    }
    else{
        return emitter.emit('ERROR')
    }
  return emitter
}


exports.removeItem = (data)=>{
    console.log("data received in cart service" ,  data)
    let emitter = new EventEmitter();
    if(data && data.email && data.productid){
        console.log("itwm to be removed" , data )
        CartModel.findOneAndRemove(data,(err,res)=>{
            console.log("result of item remove operation", err,res)
             if(err){
                 return emitter.emit('ERROR',err)
                }
                else{
                   return emitter.emit('SUCCESS')
                }
            }
         )
    }
    else{
        setTimeout(()=>{
            return emitter.emit('ERROR')
        },1000)
       
    }
    return emitter;
}

exports.removeAll = (data) => {
    let emitter = new EventEmitter();
    if(data && data.email){
        CartModel.removeAll(data,(err,result)=>{
            if(err){
                return emitter.emit('ERROR')
            }
            else{
                return emitter.emit('SUCCESS')
            }
        })
    }
    else{
        setTimeout(()=>{
            return emitter.emit('ERROR')
        },1000)
    }

    return emitter
}