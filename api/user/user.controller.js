const UserService = require('./user.service');
const CryptoJS = require('crypto-js');
const AuthService = require('../authservice');


exports.getUsers = (req,res)=>{
    console.log(">>>>>>>>>>>>>>>>>>>>>" , req.baseUrl,":::" , req.hostname)
    UserService.listAll()
    .once('ERROR' , (err)=>{
        res.send(err);
    })
    .once('NOT_FOUND' , ()=>{
      res.send("No Users Found");
    })
  .once('SUCCESS' , (users)=>{
      res.send(users);
   })
  }

  exports.verifyUser = (req,res)=>{
      UserService.verifyUser(req.query)
      .once('ERROR' , (err)=>{
        res.send(err);
    })
    .once('NOT_FOUND' , ()=>{
      res.send("Not Found");
    })
  .once('SUCCESS' , ()=>{
      res.send({
          message:"Success"
      });
   })
  }

exports.createUser = (req,res)=>{
    console.log("req body" , req.body);
UserService.newUser(req.body, req.hostname)
.once('ERROR',(err)=>{
   res.send({message:"Please Provide Details"})
})
.once('SUCCESS',(err)=>{
    res.send(
    	{message:"User Registered"})
})
.once('ALREADY_EXISTS',(err)=>{
    res.send({
        message:"User Already Exists"
    })
})
}

exports.searchUsers = (req,res)=>{
    
    UserService.findUsers(req.query.q)
    .once('Success',(users)=>{
        res.send({
            data:users
        })
    })
    .once('Error',(error)=>{
        res.send({
            error:"Internal Server Error"
        })
    })
}

exports.deleteUser = (req,res)=>{
    console.log("req body" , req.body);
    UserService.remove(req.body)
    .once('ERROR',(err)=>{
       res.send({errorMessage:"Error in User Deletion"})
    })
    .once('SUCCESS',(err)=>{
        res.send(
            {message:"User Deleted"})
    })
}

exports.resetPassword = (req,res)=>{
    console.log("in forgot req body" ,req.body)
    UserService.sendPassword(req.body)
    .once('ERROR',(err)=>{
       res.send({errorMessage:"Error in Resetting Password"})
    })
    .once('SUCCESS',(err)=>{
        res.send(
            {message:"Password Sent to your email"})
    })
    .once('NOSUCHUSER',(err)=>{
        res.send(
            {message:"No Such Email exists"})
    })
}


exports.login = (req,res)=>{
    // var password = CryptoJS.HmacSHA1(req.body.password,"mysecretkey").toString();
    // var data = {
    //     email:req.body.email,
    //     password:password
    // }
    if(req.body && req.body.email && req.body.password){
        UserService.findUser(req.body)
        .once('ERROR' , ()=>{
                res.send('ERROR')
        })
        .once('SUCCESS' , (user)=>{
            console.log("here we will set token")
            AuthService.setToken(req.body.email)
            .once('SUCCESS' ,(data)=>{
                user['token'] = data["token"]
                res.set("Authorizaton",data["token"])
               res.send(user)
            })
            .once('ERROR' ,(err)=>{
                res.send("Error in Login")
            })
        })
        .once('INVALID_LOGIN' , ()=>{
            res.send({
                message:"Invalid Credentials"
            })
        })
    }
    else{
        res.status(500).send({
            message:"Please provide credentials"
        })
    }
 
}

exports.userDetails = function(req,res){
    var token = req.get('authtoken')
    if(token){
        UserService.findUser({
            token:token
        })
        .once('ERROR' , ()=>{
                res.status(500).send('ERROR')
        })
        .once('SUCCESS' , (user)=>{
            delete user["token"]
            res.send({
                data:user
            })
        })
        .once('INVALID_LOGIN' , ()=>{
            res.status(500).send({
                message:"Invalid Request"
            })
        })
    }
    else{
        res.status(500).send({
            message:"Invalid Request"
        })
    }
}


exports.logout = (req,res)=>{

    var token = req.get('authtoken')
    UserService.remove()
    .once('ERROR',()=>{
        console.log("....")
    })
    // UserService.removeToken(token)
    // .once('ERROR',()=>{
    //     res.send({
    //         "message":"Some Error Occured"
    //     })
    // })
    // .once('SUCCESS',()=>{
    //     res.send({
    //         "message":"Logged Out Succesfully"
    //     })
    //})
   


}
