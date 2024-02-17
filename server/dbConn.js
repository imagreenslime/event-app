const mongoose = require('mongoose');

require('dotenv').config();
// const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://shanehnguyen:2cpAkdt6rDyNxdYf@events.haibga0.mongodb.net/liftingDB?retryWrites=true&w=majority"
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