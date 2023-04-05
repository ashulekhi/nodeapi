var EventEmitter = require("events");
let nodemailer = require('nodemailer')
var Jwt = require('jsonwebtoken')

// create reusable transporter object using the default SMTP transport

console.log("in mail service");
exports.sendMail = function(email , cb, hostname){
    console.log("here we have to send mail" ,email);
   let transporter = nodemailer.createTransport({
      service: "gmail",
      host:'smtp.gmail.com',
      port: 587,
      secure: false,
      authentication:'plain', // true for 465, false for other ports
      auth: {
        user: "lekhi.sahab@gmail.com", // generated ethereal user
        pass: "bkmthqwlfbdkumiw" // generated ethereal password
      }
    });
    var token = Jwt.sign({email:email},'mysecretkey')
    console.log("token generated" , token)
  
    // setup email data with unicode symbols
    var url = "https://"+hostname+ "/api/verify?token="+token
    //https://apifromashu.herokuapp.com/api/verfiy?token=gdhsgafhjgsdhjfgjhsvfhjsdgfhjgsj
    let mailOptions = {
      from: '"Lekhi Sahab 👻" <lekhi.sahab@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "NO-Reply ✔", // Subject line
      text: "Welcome", // plain text body
      html: "<b>Welcome to our Shopping site. Enjoy Shopping! Click Here to </b>" + `
      <a href=${url} >Verify</a>` // html body
    };
  
    // send mail with defined transport object
  transporter.sendMail(mailOptions , function(err,info){
  
      if(err){
        console.log("error in sending mail", err)
        cb(err,null)
      }
      else{
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        cb(null,info)
      }
  }) 
}
exports.sendPasswordMail =function(email,password){
    console.log("here we have to send mail" ,email);
    var emitter = new EventEmitter()
    let transporter = nodemailer.createTransport({
       service: "gmail",
       host:'smtp.gmail.com',
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
         user: "lekhi.sahab@gmail.com", // generated ethereal user
         pass: "mjauecbldjsjykyz" // generated ethereal password
       }
     });
   
     // setup email data with unicode symbols
     let mailOptions = {
       from: '"Lekhi Sahab 👻" <lekhi.sahab@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "NO-Reply ✔", // Subject line
       text: "Your Password is " + " " + password // plain text body
       // html body
     };
   
     // send mail with defined transport object
   transporter.sendMail(mailOptions , function(err,info){
   
       if(err){
         console.log("error in sending mail", err)
       }
       else{
         console.log("Message sent: %s", info.messageId);
         // Preview only available when sending through an Ethereal account
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
       }
   }) 
 
   return emitter
}
