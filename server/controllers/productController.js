const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
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


exports.getProducts = async(req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

// get single product details 

exports.getSingleProduct = async(req, res, next) => {
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


}

// update product 

exports.updateProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    try {
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
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
}

//delete product

exports.deleteProduct = async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })

}