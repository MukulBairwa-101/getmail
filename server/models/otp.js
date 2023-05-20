const mongoose = require('mongoose');

const otpShema  = mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim: true,
    },
    code:{
        type: Number,
        required:true,
        unique: true,
        maxLength:6,
        minLength:6
    },
    expiresIn:{
        type:Number,
        required:true,
    }

},{ timestamps: true })

module.exports = mongoose.model('otp',otpShema);
