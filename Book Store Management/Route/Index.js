const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
app.use(morgan());
app.use(express.json());

app.use(cors());

// ***************************************************
// Defining the port Number.

const Port = process.env.Port;

const main = require('./dbconnection');
main()
    .then(() => console.log('mongoose databse connected'))
    .catch(err => console.log(err));



// ** Entry Endpoints for APIs. ****
const userRouter = require("./Routes/User.route");
app.use('/user',userRouter);

const cartRouter = require("./Routes/Cart.route");
app.use("/cart",cartRouter);

const booksRouter = require("./Routes/Books.route");
app.use("/books",booksRouter);

app.listen(Port,()=>{
    console.log(`Server is running on Port ${Port}`);
})