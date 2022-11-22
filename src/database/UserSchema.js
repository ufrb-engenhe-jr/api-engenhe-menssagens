const mongoose = require("mongoose")
const Schema = mongoose.Schema

const User = new Schema({
    name:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    type:{
        type: String,
        enum: ["ROOT", "USER"],
        default: "USER",
    },
    created_at:{
        type: Date,
        default: new Date,
    }
})

module.exports = mongoose.model('User', User)