const mong = require('mongoose')

const Schema = mong.Schema

const VidSchema = new mong.Schema({
    path: {
        type: String, required: true
    }
})

const VidModel = new mong.model("vid", VidSchema)

module.exports = VidModel