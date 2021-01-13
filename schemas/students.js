/**
 * define students data
 */
const mongoose = require('mongoose')

const students = {
    "studentId": String,
    "name": String,
    "sex": String,
    "major": String,
    "college": String,
    "phone": String,
    "employmentStatus": String,
    "enterprise": String,
    "enterpriseType": String,
    "enterpriseAddress": String,
    "enterprisePhone": String,
    "reportEnterprise": String,
    "reportAddress": String,
    "createDate":Date,
    "updateDate":Date
}
const studentSchema =mongoose.Schema(students)
module.exports = studentSchema