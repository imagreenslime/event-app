const mongoose = require('mongoose');
const uri = "mongodb+srv://shanehnguyen:2cpAkdt6rDyNxdYf@events.haibga0.mongodb.net/?retryWrites=true&w=majority";

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