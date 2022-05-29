const express = require('express');
const rotas = express.Router();

const fs = require('fs');
// const path = require('path');
const {exec} = require('child_process');
const bodyParser = require('body-parser')
const app  = express();
app.use(bodyParser.urlencoded({ extended: false }))
const imagemModelo =require('./modelos/galeria');
// const {upload,s3} = require('./config/multer');
const path = require('path');
const multer = require('multer');
const Aws = require('aws-sdk');
const {details} = require('../controller/register');

const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, '');
    }
});

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' ||file.mimetype==='image/png') {
        cb(null, true)
        // console.log(file)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

const s3 = new Aws.S3({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
    secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})
// Recebendo imagem
var time = 1;
rotas.get("/",  (req, res) => {
    imagemModelo.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            
            res.render('app', { time: time });
        }
    });
});
// Enviando imagem
rotas.post("/",  upload.single('image'), (req, res) => {
    console.log(req.body) // form file
    var Name =""
    if(req.file.originalname.includes("jpeg") ){
        Name = '.jpg'
    }
    else{
        Name = req.file.originalname.slice(-4);
    }
    let yourname = req.body.name;
    yourname = yourname.split(" ").join("");
    var fileName = yourname+req.body.pesc+'2'+Name;

    fileName = fileName.toLowerCase();
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:fileName,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
    
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }
        console.log(data)

        var product = new imagemModelo({
            name: req.body.name,
            desc: req.body.pesc,
            img: data.Location
        });

    product.save()
        .then(result => {
            if(time==1)
            { 
                // time=time+1;
                res.render('signin');
            }
            
        })
        .catch(err => {
            console.log("error", err)
            res.send({ message: err })
  })
    });
});

module.exports = rotas;