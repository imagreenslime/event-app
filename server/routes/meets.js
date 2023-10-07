const express = require('express');
const router = express.Router();
let Meet = require('../models/Meet');

const federationOptions = [
    "USPA",
    "USAPL",
    "AMP",
]

router.get("/", async (req, res) => {

    //const page = req.query.page
    const federation = req.query.federation || ""
    const name = req.query.name || "" // name currently not in use

    const query = { federation: {$in: federation}, name: {$regex: name} }
    const countPromise = Meet.estimatedDocumentCount(query)

    //const itemPromise = Meet.find(query, null, {skip: parseInt(page) * itemsPerPage, limit: itemsPerPage}) 

    const itemPromise = Meet.find(query, null)
        .sort({date: 1})
        .catch(err => res.status(400).json("error: " + err));

    const [count, items] = await Promise.all([countPromise, itemPromise])
    
    // const pageCount = Math.ceil(count / itemsPerPage)
    console.log(`${federation}, ${name}, count: ${count}`)
    res.json({info: items, itemCount: count, fedOptions: federationOptions})
    
})
module.exports = router;
