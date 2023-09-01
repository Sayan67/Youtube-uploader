const mongoose = require('mongoose');

const Schema = mongoose.Schema

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
    },
    
    user_type: {
        type: String,
        required: true
    },

    transactions: {
        type: [{type: Schema.Types.ObjectId, ref: 'transaction'}],
        default: [],
    }
});

const ConsumerModel = new mongoose.model("consumer",ConsumerSchema);
module.exports = ConsumerModel;