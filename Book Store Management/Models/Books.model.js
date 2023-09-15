const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    ISBN:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
    reviews:[
        {
            comment: String,
            rating: Number
        }
    ],
});

const book = mongoose.model("Book", bookSchema);

module.exports = book;