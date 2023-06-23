const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const scrapers = require('./web-scraping/scrapers');

const connectDB = require('./dbConn.js');

const app = express()

// connect to mongodb
connectDB()

// update events with whatever testing before database
scrapers.initializeFederation().then(() => (
    app.get("/api", (req, res) => {
        console.log("hello")
        res.json(scrapers.events)
    })
))


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {console.log("server on port 3000")})
})


// 2cpAkdt6rDyNxdYf