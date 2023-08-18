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
    state: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    date: {
        type: String, // turn into date and start and end
        required: true
    },
    // links
    // 
})

const meetModel = mongoose.model('Meets', meetSchema)
module.exports = meetModel 