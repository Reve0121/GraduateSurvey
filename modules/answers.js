const conn = require('../public/connection')
const answersSchema = require('../schemas/answersSchema')

module.exports = conn.model("answers", answersSchema)