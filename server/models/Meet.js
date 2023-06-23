const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const meetSchema = new Schema({
    federation: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Meet', meetSchema)