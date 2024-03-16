const express = require('express');
const { MongoClient, ServerApiVersion, BulkWriteResult } = require('mongodb');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { initializeEvents, deleteEvents } = require('./web-scraping/handlingEvents.js');
const connectDB = require('./dbConn.js');

const app = express();

// connect to mongodb
connectDB();



// update events with whatever testing before database


const meetRouter = require('./routes/meets');
app.use('/meets', meetRouter);

//const userRouter = require('./routes/users');
//app.use('/users', userRouter);

// deleteEvents();
// initializeEvents();

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {console.log("server on port 3000")});
})
//console.log("Connected to MongoDB");
//app.listen(3000, () => {console.log("server on port 3000")});
// app.listen(3000, () => {console.log("server on port 3000")});
// 2cpAkdt6rDyNxdYf