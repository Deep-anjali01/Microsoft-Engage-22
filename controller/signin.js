const bodyParser = require("body-parser"); 
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");


const signing = (req, res) => {
    res.render('signin');
};
const signinp = (req, res) => {
    
    const name = req.body.name;
    const password = req.body.password;
    User.find((err,result)=>{
        if(err){
            console.log(err);
        }else{

            let notfound =0;
            result.forEach((user)=>{
                // console.log(name, user.name)
                // console.log(password, user.password)
                if(user.name === name && user.password === password){
                    notfound=1;
                    console.log(1)
                    
                }
                else if(notfound!=1){
                    notfound=0;
                }
            })
            if(notfound===1){
                res.render('welcome')
            }else{
                res.send("wrong credentials");
            }
        }
    })
};


module.exports = {signing, signinp};