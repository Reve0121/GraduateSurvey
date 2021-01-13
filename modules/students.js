
const conn = require('../public/connection')
const studentSchema = require('../schemas/students')

const studentModel = conn.model("students",studentSchema)

module.exports = studentModel