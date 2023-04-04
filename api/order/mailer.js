const nodemailer= require('nodemailer');
exports.sendMail = function(kisko,kya,kisliye){
    return new Promise(function(resolve,reject){
        let testAccount =  nodemailer.createTestAccount(); 
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "lekhi.sahab@gmail.com", // generated ethereal user
              pass:  "test@987654321"// generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
          });
        
          // send mail with defined transport object
          let info = transporter.sendMail({
            from: '"Lekhi Sahab👻" <lekhi.sahab@gmail.com>', // sender address
            to: kisko, // list of receivers
            subject: kisliye, // Subject line
            text: kya // html body
          } , function(error,info){
              if(error){
                  reject(error)
              }
              else{
                  resolve(info)
                  console.log("Message sent: %s", info.messageId);                  
                  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); 
              }
          });
    })
}

