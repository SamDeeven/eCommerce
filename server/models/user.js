const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please enter your name"] },
    email: { type: String, required: [true, "Please enter your email"], validate: [validator.isEmail, "Please enter valid email address"], unique: true },
    city: { type: String, required: [true, "Please enter your city"] },
    password: { type: String, required: [true, "Please enter your password"], select: false },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: 'user' }
})

// hashing password before saving user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)

})

// compare user entered password and registered password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}



// returning JWT Token for registered user
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME
    })
}



module.exports = mongoose.model("User", userSchema)