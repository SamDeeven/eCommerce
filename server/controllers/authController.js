const User = require('../models/user');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


// register a user
dotenv.config({ path: 'config/config.env' })

exports.signup = catchAsyncErrors(async(req, res, next) => {


    // const { name, email, city, password } = req.body
    // if (!name || !email || !city || !password) {
    //     res.status(422).json({ error: "Please add all fields" })
    // }

    // User.findOne({ email })
    //     .then((savedUser) => {
    //         if (savedUser) {
    //             return next(new ErrorHandler('User already exists with this username', 422))

    //         }
    //         bcrypt.hash(password, 10)
    //             .then(hashedPassword => {
    //                 const user = new User({
    //                     name,
    //                     email,
    //                     city,
    //                     password: hashedPassword
    //                 })
    //                 user.save()

    //                 .then(user => {
    //                     const token = user.getJWTToken();

    //                     res.json({
    //                         success: true,
    //                         message: "Successfully Signed up",
    //                         token
    //                     })
    //                 })

    //                 .catch(err => {
    //                     console.log(err)
    //                 })
    //             })


    //     })



    const { name, email, city, password } = req.body;

    const user = await User.create({
        name,
        email,
        city,
        password,
    })

    sendToken(user, 200, res)





})

exports.signin = catchAsyncErrors(async(req, res, next) => {


    // const { email, password } = req.body
    // if (!email || !password) {
    //     return next(new ErrorHandler('Please provide all fields', 401))
    // }
    // User.findOne({ email })
    //     .then(savedUser => {
    //         if (!savedUser) {
    //             return next(new ErrorHandler('Invalid Email or Password', 401))
    //         }
    //         bcrypt.compare(password, savedUser.password)
    //             .then(ifMatched => {
    //                 if (ifMatched) {
    //                     const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)

    //                     res.cookie('jwt', token, {
    //                         expires: new Date(
    //                             Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
    //                         ),
    //                         httpOnly: true
    //                     })
    //                     res.json({
    //                         success: true,
    //                         message: "Succesfully Signed in",
    //                         token
    //                     })
    //                 } else {
    //                     return next(new ErrorHandler('Invalid Email or Password', 401))
    //                 }
    //             })


    //     })


    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)



})



// get signed in user details

exports.getUserProfile = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

})






//signout user

exports.signout = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Signed out'
    })
})