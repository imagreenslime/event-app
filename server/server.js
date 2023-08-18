const express = require('express');
const { MongoClient, ServerApiVersion, BulkWriteResult } = require('mongodb');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const scrapers = require('./web-scraping/scrapers');
const meetModel = require('./models/Meet');
const connectDB = require('./dbConn.js');

const app = express();

// connect to mongodb
connectDB();
// meetModel.deleteMany({}).then(console.log("hello"));
function handleEvents(event){
    meetModel.exists({name: event.name})
    .then((product) => {
        if (product != null){
            return;
        }
        const newMeet = new meetModel({federation: event.federation, name: event.name, state: event.state, address: event.address, date: event.date});
        newMeet.save()
        .then(() => console.log(`meet added: ${event.name}`)) 
        .catch(err => console.log('error: ' + err));
    })
}

//scrapers.initializeFederation().then(() => {
//    scrapers.events.forEach((event) => { 
//        handleEvents(event);
//    })
//})

// update events with whatever testing before database


const meetRouter = require('./routes/meets');
app.use('/meets', meetRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {console.log("server on port 3000")});
})

// 2cpAkdt6rDyNxdYf