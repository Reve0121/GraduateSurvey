const conn = require('../public/connection')
const questionSchema = require('../schemas/questionSchema')

module.exports =   conn.model("questions",questionSchema)

