const UserModel = require("./user.model");
const CryptoJS = require('crypto-js');
let EventEmitter =require('events');
let MailService = require('../mailservice');
let Jwt = require('jsonwebtoken')

exports.verifyUser = (data)=>{
    let emitter = new EventEmitter();
    console.log("here we have to verify users")
    var data = Jwt.verify(data.token,'mysecretkey')
    UserModel.update({email:data.email},{$set:{verified:true}},(err,updated)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            console.log("update user" , updated);
            if(updated.nModified==1){
               return emitter.emit('SUCCESS')
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })
    return emitter
}

exports.listAll = ()=>{
    let emitter = new EventEmitter();
    console.log("here we have to get users")
    UserModel.find({},{name:1,email:1,createdAt:1},(err,users)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            console.log("products" , users);
            if(users.length>0){
               return emitter.emit('SUCCESS',users)
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })
    return emitter
}

exports.newUser = (data,hostname)=>{
    let emitter  = new EventEmitter();
if(data && data.password){
UserModel.findOne({email:data.email},(err,user)=>{
if(err){
    console.log("error in new user method" ,err)
    return emitter.emit("ERROR")
}
else{
    console.log("...." , user);
    if(user){
        console.log("user already exists" , user)
        return emitter.emit('ALREADY_EXISTS')
    }
    else{
        console.log("we have to create a user here" , data)
        if(validateEmail(data.email)){
            console.log(data);
            // data.password=CryptoJS.HmacSHA1(data.password,"mysecretkey");
            // console.log(" password after encryption" , data.password.toString())
            data["id"]= Date.now();
            let newUser = new UserModel(data)
            console.log("user before saving" , newUser);
            newUser.save((err,user)=>{
                if(err){
                    return emitter.emit('ERROR',err)
                }
                else{
                    MailService.sendMail(data.email , (error,success)=>{
                        if(error){
                            return emitter.emit('ERROR');
                        }
                        else{
                            return emitter.emit('SUCCESS',user);
                        }
                    },hostname)                   
                }
            })
        }
        else{
            console.log("Error in validating email")
            return emitter.emit('ERROR')
        } 
    }
}
})
}
else{
    console.log(">>>> daata not complete" , data)
     return emitter.emit('ERROR')
}

return emitter
}


exports.findUser = (data)=>{
    console.log(data,"data");
    if(data.token){
        var queryObj = {
            token:data.token
        }
    }
    else{
        var queryObj = {
            email:data.email,
            password:data.password,
            verified:true
        }
    }
   let emitter = new EventEmitter();
   
   UserModel.findOne(queryObj ,{_id:0,role:1,name:1,email:1,token:1,imageUrl:1} ,(err,user)=>{
       if(err){
           console.log(">>>err" , err)
           return emitter.emit('ERROR')
       }
       else{
          if(user){
              console.log("from data base" , user);
            return emitter.emit('SUCCESS',user) 
          }
          else{
              return emitter.emit('INVALID_LOGIN')
          }
       }
   })
           
   return emitter
       }

exports.removeToken = (data)=>{
    let emitter = new EventEmitter();
  if(data){
    UserModel.findOneAndUpdate({token:data},{$set:{token:null}},{new:true},(err,data)=>{
        if(err){
            emitter.emit('ERROR' ,err)
        }
        else{
            console.log(".... after removing token" , data);
            emitter.emit('SUCCESS',data)
        }
        
   })
  }else{
      return emitter.emit('ERROR');
  } 
  
  return emitter
}

exports.remove = (data)=>{
    let emitter = new EventEmitter();
    if(data && data.email){
        UserModel.remove(data).then(
            (response)=>{
                console.log("user deleted" , response)
                emitter.emit('SUCCESS')
            },
            (error)=>{
                console.log("error in user deletion",error)
                emitter.emit('ERROR')
            }
        )
    }
    else{
        setTimeout(()=>{
            emitter.emit('ERROR')
        },1000)
    }
   

   return emitter
}

exports.sendPassword = (data)=>{
    let emitter = new EventEmitter();
    if(data && data.email){
        UserModel.findOne(data).then(
            (response)=>{
                if(response){
                    console.log("response from user in password setting" , response)
                    MailService.sendPasswordMail(data.email,response.password)
                    return emitter.emit('SUCCESS')
                }
                else{
                    return emitter.emit('NOSUCHUSER')
                }
               
            },
            (error)=>{
                console.log("error in sending reset Password",error)
                emitter.emit('ERROR')
            }
        )
    }
    else{
        setTimeout(()=>{
            emitter.emit('ERROR')
        },1000)
    }
   

   return emitter
}

exports.findUsers=function(data){
    let emitter=new EventEmitter()
    var regexstring = "^" + data +".*"
    console.log("query received in user service" , data)
    UserModel.find({name:{$regex:regexstring , $options:'i'}}).then(function(result){
        console.log('user found',result)
        emitter.emit('Success',result)
    },function(error){
        console.log('error',error)
        emitter.emit('Error')
    })
    return emitter
}




function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}