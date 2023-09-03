const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require("dotenv").config();
const app = express();

app.use(morgan());
app.use(express.json());
//************************************************ */
// Defining Port number.
const Port = process.env.Port;

//**************DATABASE CONNECTION************************** */

//To Connect to the MONGODB Database.
const main = require("./dbconnection");
// Returning a Promise.
main()
    .then(() => console.log("mongoose database connected."))
    .catch(err => console.log(err));



// MAIN OR GATEWAY APIN ENDPOINT FOR OUR PRODUCT *****************
const productrouter = require('./routes/product.route')
app.use('/api', productrouter)
//*************************************************************************** */

//*******************DEFINING THE SCHEMA AND MAKING MODEL OF MONGODB********************* */
// PRODUCT SCHEMA.


//Category API Endpoints

app.post("/api/categories",async (req, res) => {
    try {
        // Making sure taking out from request body the JSON Keys.
        let { categoryName, description } = req.body
        //Making sure to insert the value inside model in the same way defined in the schema.
        const CategoryData = new CategoryModel({
            Category_name: categoryName,
            Description: description
        });
        let sendcategoryData = await CategoryData.save();
        res.status(200).json({
            message: "Category data inserted succesfully",
            sendcategoryData
        })
    } catch (error) {
        console.log("POST api/categoris");
        res.status(404).json({
            error
        })
    }
})












app.listen(Port, () => {
    console.log("Server Running ...");
})