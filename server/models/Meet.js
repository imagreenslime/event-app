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
    },
    address: {
        type: String,
    },
    date: {
        type: String, // turn into date and start and end
        required: true
    },
    link: {
        type: String,
        required: true
    }
    // links
    // 
})

const meetModel = mongoose.model('Meets', meetSchema)
module.exports = meetModel 