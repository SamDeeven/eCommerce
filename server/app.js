const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/errors')





app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Importing the routes
const products = require('./routes/product')

app.use('/api/v1', products)
    //middleware
app.use(errorMiddleware)

module.exports = app