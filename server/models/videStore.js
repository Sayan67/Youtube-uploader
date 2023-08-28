const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    tags:{
        type: String,
        required: true,
    }
});

const UserModel = new mongoose.model("users",UserSchema);
module.exports = UserModel;