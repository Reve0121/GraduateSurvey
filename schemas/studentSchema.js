/**
 * define students schema
 */
const mongoose = require('mongoose')

const students = {
    //学号
    "studentId": String,
    //姓名
    "name": String,
    //性别
    "sex": String,
    //专业
    "major": String,
    //学院
    "college": String,
    //联系方式
    "phone": String,
    //毕业去向
    "employmentStatus": String,
    //单位名称
    "enterprise": String,
    //单位性质（类别）
    "enterpriseType": String,
    //单位地址
    "enterpriseAddress": String,
    //单位联系方式
    "enterprisePhone": String,
    //报到证所在单位
    "reportEnterprise": String,
    //报到证迁往地
    "reportAddress": String,
    //创建日期
    "createDate": Date,
    //更新日期
    "updateDate": Date
}
module.exports = mongoose.Schema(students)
