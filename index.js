const express = require('express');

const app = express();

const port = 5000;
const product = require('./product')
console.log(product, "Final Product");

//server will be using Json format.
app.use(express.json());

app.get('/data',(req,res)=>{
    res.send(product)
})

//Client will be sending some useful
//info in the request.

//Take the data from client and update database.
app.post('/addproduct',(req,res)=>{
    
    //Coming from client request.
    console.log(req.body,"This is coming from client request.");
    let name = req.body.name

    // res.send("received the data");

    if(!name){
        return res.json({
           message: "name does not exists .." 
        })
    }

    //We have to add that name to our database with id.
    let obj = {
        name: name,
        id: product.length+1
    }

    product.push(obj);
    res.json({
        message:"data inserted succesfully",
        product
    })
})

app.listen(port,()=>{
    console.log("Server is running succesfully.");
})