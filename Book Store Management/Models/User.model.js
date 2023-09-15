const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    joiningDate:{
        type: Date,
        default: new Date(Date.now())
    }
},{
    timestamps: true
});

const UserModel = mongoose.model("User",userSchema);

module.exports = UserModel;