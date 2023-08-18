const express = require('express');
const router = express.Router();
let Meet = require('../models/Meet');

const federationOptions = [
    "USPA",
    "USAPL",
]

const itemsPerPage = 10;
router.get("/", async (req, res) => {

    const page = req.query.page
    const federation = req.query.federation || ""
    console.log(page, federation)

    const query = { federation: {$in: federation} }
    const countPromise = Meet.estimatedDocumentCount(query)
    
    const itemPromise = Meet.find(query, null, {skip: parseInt(page) * itemsPerPage, limit: itemsPerPage}).sort({ date : 1}).catch(err => res.status(400).json("error: " + err));

    const [count, items] = await Promise.all([countPromise, itemPromise])
    const pageCount = count / itemsPerPage
    
    res.json({info: items, pageCount: pageCount, fedOptions: federationOptions})
    
})
module.exports = router;
