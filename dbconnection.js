const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(process.env.Mongo_Url);
}

module.exports = main;