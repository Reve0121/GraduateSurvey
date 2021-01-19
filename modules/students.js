
const conn = require('../public/connection')
const studentSchema = require('../schemas/studentSchema')

module.exports = conn.model("students", studentSchema)

