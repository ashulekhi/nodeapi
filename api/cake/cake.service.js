const cakeModel = require("./cake.model");

var EventEmitter = require('events');


exports.getcake = (data)=>{
    let emitter = new EventEmitter();
    console.log(data);
if(data){
    cakeModel.findOne(data ,(err,cake)=>{
        console.log("all cake details" ,cake , err);

      if(cake){
          return emitter.emit('SUCCESS' , cake)
      }
      else{
          return emitter.emit('ERROR' , err);
          }
    })
}
return emitter
}

exports.findCakes=function(data){
    let emitter=new EventEmitter()
    var regexstring = "^" + data +".*"
    console.log("query received in user service" , data)
    cakeModel.find({name:{$regex:data , $options:'i'}}).then(function(result){
        console.log('cakes found',result)
        emitter.emit('Success',result)
    },function(error){
        console.log('error',error)
        emitter.emit('Error')
    })
    return emitter
}

exports.listAll = (skip,limit)=>{

    let emitter = new EventEmitter();
    let query ={};
    let projection = {
        name:1,
        cakeid:1,
        image:1,
        price:1,
        _id:0
    }

    console.log("here we have to get produvcts")
    skip = Number.parseInt(skip);
    limit = Number.parseInt(limit);

    cakeModel.find(query,projection,{skip:skip,limit:limit},(err,cakes)=>{
        if(err){
            console.log("errr" , err);
           return emitter.emit('ERROR' , err)
        }
        else{
            if(cakes.length>0){
               return emitter.emit('SUCCESS',cakes)
            }
            else{
               return emitter.emit("NOT_FOUND")
            }
        }
    })
    return emitter
}


exports.create = (data ,callback)=>{
    console.log("here we will create the cake" , data);
    if(data){
        
        var cake =new cakeModel(data);
        cake["cakeid"] = Date.now();
        cake["owner"]={email:data.user.email,name:data.user.name}
        cake.save((err,cake)=>{
            if(err){
                console.log("error in creating cake" , err);
                callback(err,null);
            }
            else{
                console.log("new cake created" ,cake)
                callback(null,cake)
            }
         })
    }
    else{
        console.log("No data found for cake");
    }
}