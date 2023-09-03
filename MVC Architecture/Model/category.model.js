const mongoose = require('mongoose');

const { Schema } = mongoose;

// CATEGORY SCHEMA
const CategorySchema = new Schema({
    Category_name: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }

})

const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;