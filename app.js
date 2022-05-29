const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
require('dotenv').config()
const signin = require('./routes/signin')
const register = require('./routes/register')
app.set('view engine', 'ejs')
const mongoose = require("mongoose");
const faceapi = require('face-api.js');
//connections

const uri = process.env.MONGODB;
const images1 = require('./src/rotas')
const images2 = require('./src/rotas2')
// const welcome = require('./routes/welcome')
mongoose.connect(uri, { useNewUrlParser: true });
app.use(express.json())
//PORT

const PORT = process.env.PORT || 3000;

// routes

app.use(express.static("public"));
app.use('/signin',signin)
app.use('/register',register)
app.use('/imagens1', images1);
app.use('/imagens2', images2);
// app.use('/welcome', welcome);

app.listen(PORT, () => {
    console.log('listening on',PORT)
    });


