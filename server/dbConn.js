const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.ATLAS_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB  