/**
 * define question schema
 */
const mongoose = require("mongoose")

const question = {
    "_id": String,
    "question": String,
    "answerA": String,
    "answerB": String,
    "answerC": String,
    "answerD": String,
    "required": String,
    "type": String,
    "createDate": Date,
    "updateDate": Date
}
module.exports = mongoose.Schema(question)
