const User = require('../models/user')


const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors')

const dotenv = require('dotenv');

dotenv.config({ path: 'server/config/config.env' })


//checks if user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {

    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('First Signin to access this resource', 401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    next()

})