const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    // VALIDATIONS
    Product_name: {
        type: String,
        required: true
    },
    Product_description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Category: {
        // (REFERENCE TO CATEGORY SCHEMA_ID)
        // Below field will be storing OBJECT_ID OF Another Schema.
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    Stock_quantity: {
        type: Number,
        required: true,
        default: 20
    }
});

// MAKING MODEL OUT OF THE ABOVE MENTIONED SCHEMA***********************
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;