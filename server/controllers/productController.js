const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const APIFeatures = require('../utils/apiFeatures')




//create new product

exports.newProduct = catchAsyncErrors(async(req, res, next) => {
    try {

        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
    }

})


exports.getProducts = catchAsyncErrors(async(req, res, next) => {
    const resultsPerPage = 4;
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .pagination(resultsPerPage)

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
})

// get single product details 

exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    try {
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));


        }
        res.status(200).json({
            success: true,
            message: "Product found",
            product
        })

    } catch (err) {
        res.status(500).json({
            error: "Internal server error"
        })
        console.log(err)
    }


})

// update product 

exports.updateProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    try {
        if (!product) {
            return next(new ErrorHandler("Product not found", 404));

        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
})

//delete product

exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));

    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })

})