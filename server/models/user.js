const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema =  mongoose.Schema({
    firstname:{
        type: String,
        required:true,
        trim: true
    },
    lastname:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        trim: true
    }

},{ timestamps: true })  ;


userSchema.pre('save',async function(next){   

    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password=  await bcrypt.hash(this.password, salt);
    

})



module.exports = mongoose.model('user',userSchema);