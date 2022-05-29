const bodyParser = require("body-parser"); 
const express = require("express");
// const User = require("model/register");
// const md5 = require('md5');
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
// const popup = require('popups')



const registerg = (req, res) => {
    res.render('register',{aler:0});
};
const registerp = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const password =  (req.body.password);
    const confirm_password =  (req.body.confirm_password);
    if(password==confirm_password)
    {
        const user = new User({
            name: name,
            email: email,
            phone_no: phone_no,
            password: password,
            confirm_password: confirm_password
          });
          user.save((err) => {
            if (err) {
              console.log(err);
              // popup.alert("phone number or email already exists");
              res.render('register',{aler:1});
            }
            else{
              res.redirect("/imagens1");
            }
        });
    }
    else{
        let message = "password does not match";
        console.log(message);
        alert(message);
        
    }
};

module.exports = {registerg, registerp};