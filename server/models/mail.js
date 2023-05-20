const mongoose = require('mongoose');


const mail =  mongoose.Schema({
    from:{
        type: String,
        required:true,
        trim: true,
    },
    to:{
        type: String,
        required:true,
        trim: true
    },
    subject:{
        type: String,
        required:true,
        trim: true,
    },
    body:{
        type: String,
        trim: true
    },
    username:{
        type: String,
        trim: true,
    },
    isDeleted:{
        type: Boolean,
        default:false,
    },
    isRead:{
        type: Boolean,
        default:false,
    },
    isFavourate:{
        type: Boolean,
        default:false,
    }


},{ timestamps: true })  ;





module.exports = mongoose.model('mail',mail);