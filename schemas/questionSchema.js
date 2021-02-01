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
    "required": {
        type:Boolean,
        default:true
    },
    "level": {
        type:Number,
        default:1
    },
    "active":{
        type:Boolean,
        default:true
    },
    "serialNumber": Number,
    "createDate": Date,
    "updateDate": Date
}
module.exports = mongoose.Schema(question)
