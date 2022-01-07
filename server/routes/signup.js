const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt")


router.post('/signup', (req, res) => {
    const { name, email, city, password } = req.body
    if (!name || !email || !city || !password) {
        res.status(422).json({ error: "Please add all fields" })
    }

    // res.json({ message: "Successfully Signed up" })
    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "User already exists with this email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name,
                        email,
                        city,
                        password: hashedPassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "Successfully Signed up" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
})


module.exports = router