const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    lastName: {
        type: String,
        require: [true, 'Please tell us your name!'],
        trim:true
    },
    email: {
        type: String,
        require:  [true, 'Please your email'],
        unique: true,
        lowercase: true,
        // validate:[validator.isEmail, 'Please provide a valid email'] ,
        trim:true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      }

})



const User = mongoose.model('User', userSchema)
module.exports = User