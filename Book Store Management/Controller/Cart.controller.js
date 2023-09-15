const Cart = require("../Models/Cart.model");
const Book = require("../Models/Books.model");

const addToCart = async(req,res)=>{
    const userId = req.userId;

    const {bookId, quantity} = req.body;

    try {
        const book = await Book.findById(bookId);

        if(!book){
            return res.status(404).json({
                success: false,
                message: "Book not found."
            })
        }

        let cart = await Cart.findOne({user:userId});

        if(!cart){
            cart = new Cart({user: userId, items: []});
        }

        const itemIndex = cart.items.findIndex((item)=>
        item.book.equals(book._id));

        if(itemIndex !== -1){
            cart.items[itemIndex].quantity += quantity;
        }
        else{
            cart.items.push({book: book._id, quantity});
        }

        await cart.save();
        res.json({
            success: true, message:" Book added to cart."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"Error adding to Cart."
        });
    }
}

const getCartContents = async(req,res)=>{
    const userId = req.userId;

    try{
        const cart = await Cart.findOne({user: userId}).populate("items.book");

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        res.json({
            success: true,
            cart
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error while fetching cart contents."
        });
    }
}

const updateCartItem = async(req,res)=>{
    const userId = req.userId;
    const bookId = req.params.bookId;

    const {quantity} = req.body;

    try {
        let cart = await Cart.findOne({user: userId});

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        const itemIndex = cart.items.findIndex((item)=>
        item.book.equals(bookId));

        if(itemIndex !== -1){
            cart.items[itemIndex].quantity = quantity;
        }
        else{
            return res.status(404).json({
                success: false,
                message: "Item not found in Cart."
            })
        }

        await cart.save();
        res.status(500).json({
            success: true,
            message: "Cart updated successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating cart item."
        });
    }
}

const deleteCartItem = async(req,res)=>{
    const userId = req.userId;
    const bookId = req.params.bookId;

    try {
        let cart = await Cart.findOne({user: userId});

        if(!cart){
            return res.status(404).json({
                success: false,
                message: "Cart not found."
            });
        }

        cart.items = cart.items.filter((item)=>{
            !item.book.equals(bookId);
        })

        await cart.save();
        res.json({
            success: true,
            message: "Item removed from cart."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting the Cart items."
        })
    }
}

module.exports = {
    addToCart, getCartContents, updateCartItem, deleteCartItem
};