const booksModel = require("../Models/Books.model");

const addBook = async(req,res)=>{
    const {title, author, ISBN, price, quantity} = req.body;

    try {
        const book = new book({
            title,
            author,
            ISBN,
            price,
            quantity
        })
        await book.save();
        res.json({
            success: true,
            message: "Book Added Successfully.",
            bookId: book._id
        })
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Error occured while adding the Book."
        })
    }
}

const getAllBooks = async(req,res)=>{
    try {
        const books = await booksModel.find({});
        res.json({
            success: true,
            books
        })
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Error while fetching the books."
        })
    }
}

const getSingleBook = async(req,res)=>{
    const bookID = req.params.id;

    try {
        const book = await booksModel.findById(bookID);

        if(!book){
            return res.status(404).json({
                success: false,
                message: "Book not found."
            })
        }

        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Error fetching a Single Book."
        })
    }
}

const updateBook = async(req,res)=>{
    const bookID = req.params.bookID;
    const {title, price} = req.body;

    try {
        await booksModel.findByIdAndUpdate(bookID,{title,price});
        res.json({
            success: true,
            message: " Book updated successfully."
        })
    } catch (error) {
            return res.json({
            success: false,
            message: "Error while updating the book."
        })
    }
}

const deleteBook = async(req,res)=>{
    const bookId = req.params.bookID;

    try {
        await booksModel.findByIdAndDelete(bookId);
        res.json({
            success: true,
            message: "Book deleted successfully."
        })
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: "Error occured while deleting the Book."
        })
    }
}

const addReview = async(req,res)=>{
    const bookID = req.params.bookID;

    const{comment, review} = req.body;

    try {
        await booksModel.findByIdAndUpdate(bookID,
            {$push: {review: {comment, rating}}},
            {new: true});
            res.json({
                success: true,
                message: " Review added successfully."
            })
    } catch (error) {
            return res.status(500).json({
            success: false,
            message: " Error while adding the review."
        })
    }
}

const searchBooks = async(req,res)=>{
    const query = req.params.query;

    try {
        const books = await booksModel.find({
            $or : [{title: {$regex: query, $options: "i" }},{author: {$regex: query, $options: "i"}}],
        })
        res.json({
            success:true,
            books
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Error while searching the books."
        })
    }
}

module.exports = {
    addBook, getAllBooks, getSingleBook, updateBook, deleteBook, addReview, searchBooks
};