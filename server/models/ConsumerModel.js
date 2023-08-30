const mongoose = require('mongoose');

const ConsumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    token: {
        type:String,

    },
    picture: {
        type:String,
    }
});

const ConsumerModel = new mongoose.model("consumer",ConsumerSchema);
module.exports = ConsumerModel;