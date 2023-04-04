var EventEmitter = require('events');
var CakeCartModel = require('./cakecart.model');

exports.findCartItems = (data)=>{
  console.log("............ request in service for finding cart items" , data)
    return new Promise((resolve,reject)=>{
        
        if(data){
            console.log("data fro query is" , data)
         CakeCartModel.find({"email":data}).then((cartitems)=>{
             console.log('data received from cart items' , cartitems)
                 resolve(cartitems)   
         },(error)=>{
              reject()
         })
     }
        else{
            reject()
        }
    })
}


exports.create = (data)=>{
    console.log("this we have to add into cart",data);
    let emitter = new EventEmitter();
    if(data){
        data.email = data.user.email
        delete data["user"]
        var cartObj = new CakeCartModel(data);
                cartObj.save((err,newcakecartobj)=>{
                    console.log("result of adding cake into cart" , err , newcakecartobj)
                    if(err){
                        if(err.code==11000){
                           CakeCartModel.findOneAndUpdate({email:data.email,cakeid:data.cakeid},{$inc:{"quantity":1}}).then((result)=>{
                               console.log("result of increasing cake quantity" , result)
                               return emitter.emit('SUCCESS',result)
                           },(error)=>{
                            console.log("error of increasing cake quantity" , error)
                            return emitter.emit('ERROR',error)
                        })
                        }
                        else{
                           return emitter.emit('ERROR',err)
                            
                        }
                    }
                    else{
                       return emitter.emit('SUCCESS',newcakecartobj)
                    }
                })
        
    }
    else{
        return emitter.emit('ERROR')
    }
  return emitter
}

exports.removeWholeitem = (data)=>{
    console.log("data received in cart service" ,  data)
    let emitter = new EventEmitter();
    if(data && data.email && data.cakeid &&(data.email==data.user.email)){
        console.log("item to be removed" , data )
        var query = {
            cakeid:Number.parseInt(data.cakeid),
            email:data.email
        }
        CakeCartModel.findOneAndRemove(query).then((result)=>{
            console.log("result of removing whole cake item", result)
            return emitter.emit('SUCCESS')
          },(error)=>{
           console.log("error of removing last quantity",error)
           return emitter.emit('ERROR')
          }) 
    }
    else{
        setTimeout(()=>{
            return emitter.emit('ERROR')
        },1000)
       
    }
    return emitter;
}


exports.removeItem = (data)=>{
    console.log("data received in cart service" ,  data)
    let emitter = new EventEmitter();
    if(data && data.email && data.cakeid &&(data.email==data.user.email)){
        console.log("item to be removed" , data )
        var query = {
            cakeid:Number.parseInt(data.cakeid),
            email:data.email
        }
        CakeCartModel.findOne(query,(err,res)=>{
            console.log("result of item remove operation", err,res)
             if(err){
                 return emitter.emit('ERROR',err)
                }
                else{
                   if(res){
                    if(res.quantity>1)
                    {
                        var singlecost = res.price/res.quantity
                        CakeCartModel.findOneAndUpdate({email:res.email,cakeid:res.cakeid},{$inc:{quantity:-1}})
                        .then((result)=>{
                            console.log("result of removing cake from cart", result)
                         return emitter.emit('SUCCESS')
                        },(error)=>{
                            console.log("error of removing cake from cart",error)
                        return emitter.emit('ERROR')
                        })
                    }
                    else{
                       CakeCartModel.findOneAndRemove({email:res.email,cakeid:res.cakeid}).then((result)=>{
                         console.log("result of removing last quantity", result)
                         return emitter.emit('SUCCESS')

                       },(error)=>{
                        console.log("error of removing last quantity",error)
                        return emitter.emit('ERROR')
                       })
                    }
                   }
                   else{
                   
                        return emitter.emit('ERROR')
                    
                   } 
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


exports.getAllCartItems = ()=>{
    var emitter = new EventEmitter()
    CakeCartModel.find({}).then((cartitems)=>{
        console.log('data received from cart items' , cartitems)
        
            return emitter.emit('SUCCESS' , cartitems)
       
    },(error)=>{
            return emitter.emit("ERROR")
    })

    return emitter
}

exports.removeAll = (data) => {
    let emitter = new EventEmitter();
    console.log(">>>>>>>>>>>>>>>>>>>>>>>> for clearing cart" , data )
    if(data && data.email){
        CakeCartModel.deleteMany({email:data.email}).then((result)=>{
            console.log("result of removing everything fromcart" , result)
            return emitter.emit('SUCCESS')

        }, (error)=>{
            console.log("error of removing everything fromcart" , error)
            return emitter.emit('ERROR')
        })    
    }
    else{
        setTimeout(()=>{
            return emitter.emit('ERROR')
        },1000)
    }

    return emitter
}