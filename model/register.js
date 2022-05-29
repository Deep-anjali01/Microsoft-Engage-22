
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validator = require("validator");
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        },
    },
    phone_no:{
        type: Number,
        unique: true,
        required: true,
        minlength: 10,
      },
    password: {
        type: String,
        // required: true,
        minlength: 8
    },
    confirm_password: {
        type: String,
        // required: true,
        minlength: 8
    }

    });

userSchema.plugin(uniqueValidator);


module.exports = User = mongoose.model("user", userSchema);