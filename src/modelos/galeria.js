const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: Number,
        unique: true,
        required: true,
        minlength: 10
    },
    img:
    {
        required: true,
        type: String
    }
});

module.exports = new mongoose.model('Img', imgSchema);