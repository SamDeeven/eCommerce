const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Enter Product Name'], trim: true },
    price: { type: Number, required: [true, 'Enter Product Price'], default: 0.0 },
    description: { type: String, required: [true, 'Enter Product Description'] },
    ratings: { type: Number, default: 0 },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    }]


})

module.exports = mongoose.models.product || mongoose.model("Product", productsSchema)