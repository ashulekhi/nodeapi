var Jwt = require('jsonwebtoken');
var EventEmitter = require('events');
var UserModel = require("./user/user.model")

var token = Jwt.sign({name:"ashu"},"mysecretkey",{
    expiresIn:300
})

exports.isAuthenticated = (req,res,next)=>{
let token = req.get('Authorization')
console.log('token' , token);
if(token){
    Jwt.verify(token,'mysecretkey',(err,payload)=>{
        console.log("payload" ,payload , err)
        if(err){
            res.send("Session Expired")
        }
        else{
            if(payload){
                let findObj = {
                    email:payload.email
                }
                UserModel.findOne(findObj,(err,data)=>{
                    if(err){
                        res.status(500).send({
                            error:"Internal Server Error"
                        })
                    }
                    else if(data){
                        console.log("data of user in authentication middleware", data)
                        if(req.body){
                            req["body"]["user"] = data
                            req["body"]["email"] = data && data.email
                            req["email"] = data && data.email

                        }
                        else{
                            req["email"] = data && data.email

                        }
            
                        next()
                    }
                    
                })
            }
            else{
                res.status(500).send({
                   error:"Session Timeout"
                })
            }
            
        }
    })
}else{
   res.send({
       message:'Not Authorised'
   })
}

}



exports.refreshToken = (req,res,next)=>{
    let token = req.get('Authorization')    
    Jwt.verify(token,'mysecretkey',(err,payload)=>{
        console.log("payload" ,payload)
        if(err){
            res.send("Session Expired")
        }
        else{
            let updatedtoken = Jwt.sign(payload,'mysecretkey',{expiresIn:300})
            UserModel.findOneAndUpdate(payload,{$set:{token:updatedtoken}},{new:true},(err,data)=>{
               if(err){
                   res.send("Internal Server Error")
               }
               else{
                   next();
               }
            })
        }
    })
    
}


exports.setToken = (data)=>{
let emitter = new EventEmitter();
if(data){
    Jwt.sign({
        email:data
    },"mysecretkey" , (err,token)=>{
        console.log(err , token);
        console.log("email is" , data);
        UserModel.findOneAndUpdate({email:data},{$set:{token:token}},{new:true},(err,updatedUser)=>{
            if(err){
                console.log("error in updating token");
                return emitter.emit('ERROR');
            }
            else{
                console.log("token set" , updatedUser)
                return emitter.emit('SUCCESS',updatedUser)
            }
        })
    })
}
else{
    return emitter.emit('ERROR',{
        message:"Some Error occured"
    })
}


return emitter
}


