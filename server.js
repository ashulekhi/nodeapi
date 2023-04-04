const Express = require('express');
const Multer = require('multer')
const Cors = require('cors');
const routes = require('./routes');
const bodyParser =require('body-parser');
const Cloudinary = require('cloudinary');
const Mongoose = require('mongoose');
const AuthService = require('./api/authservice')
const databaseUrl = "mongodb+srv://ashu_lekhi1:test12345@cluster0.w5ixg.mongodb.net/apifromashu"

// const databaseUrl = "mongodb://localhost:27017/ashukart"

console.log("dynos purchased")

Mongoose.connect(databaseUrl,(err,connection)=>{
    if(err){
       console.log(">>>>>> error" , err)
    }
    else{
        console.log("database connected")
    }
    
})

Cloudinary.config({
    
        cloud_name: "lekhisahabdev", 
        api_key: "225325466155897", 
        api_secret: "MFK7aZ_m-VXsw2xk19fg9QZIt1M" 
    
})


const server = Express();
var storage = Multer.diskStorage(
    {
        destination: 'uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname+ '-' + new Date().getTime()+".jpg");
        }
    }
);

var upload = Multer( { storage: storage } );


server.use(Cors());
console.log(__dirname)

server.use(Express.static(__dirname))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(routes);
server.get("/",(req,res)=>{
     res.send();
})

server.post("/api/upload" , AuthService.isAuthenticated, upload.single('file'), (req,res)=>{
 Cloudinary.uploader.upload('./uploads/'+req.file.filename , (result)=>{
     console.log(">>> this is the result of upload" , result);
     res.send({
         "imageUrl":result.secure_url
     });
 })
})
var Port  = process.env.PORT||5000 
server.listen(Port, ()=>{
    console.log("server is running on" , Port);
})
