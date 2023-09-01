const ConsumerModel = require("./models/ConsumerModel")
const TransactionModel = require("./models/TransactionModel")

module.exports= {fetchUserData, fetchPopulatedUserData}

function getUserDataQuery(uid) {
    return ConsumerModel.find({uid})
}

function fetchPopulatedUserData(uid) {
    return ConsumerModel.find({uid})
        .populate('transactions')
        .exec()
        .then(docs => docs && docs.length != 0 ? docs[0]: null)
}

function fetchUserData(uid) {
    return ConsumerModel.find({uid})
        .exec()
        .then(docs => docs && docs.length != 0 ? docs[0]: null)
}