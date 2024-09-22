const mongoose = require("mongoose");

const oki = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

const Login = new mongoose.model("Login", oki)

module.exports = Login;