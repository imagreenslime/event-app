// not in use currently - no need for users

const express = require('express')
const router = express.Router()
let User = require('../models/User')

router.get("/", (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("error: " + err));
})


router.get("/add", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (newUser.find({ username: username})){
        res.json("Username is already taken")
    } else {
        const newUser = new User({username: username, roles: "User",  password: password});
        newUser.save()
            .then(users => res.json(users))
            .catch(err => res.status(400).json("error: " + err));
    }
})

module.exports = router
