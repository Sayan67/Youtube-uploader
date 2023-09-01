const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String, 
        required: true,
    },
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consumer',
        required: true
    },

    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'consumer'
    },

    consumer_vid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vid',
        required: true,
    },

    merchant_vid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vid',
    }
})

const TransactionModel = new mongoose.model("transaction", TransactionSchema)
module.exports = TransactionModel