const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Editor: Number,
        Admin: Number 
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('Users', userSchema);