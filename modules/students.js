
const conn = require('../public/connection')
const studentSchema = require('../schemas/students')


// //统一增加时间处理
// StudentSchema.pre('save', function (next) {
//     if (this.isNew) {
//         this.createDate = this.updateDate = Date.now();
//     } else {
//         this.updateDate = Date.now();
//     }
//     next()
// })

// StudentSchema.static = {
//     fetch: function (cb) {
//         return this.find()
//             .sort("studentId")  //排序
//             .exec(cb)
//     },
//     findById: function (id, cb) {
//         return this.findOne({ studentId: id })
//             .exec(cb)
//     }
// }

const studentModel = conn.model("students",studentSchema)

module.exports = studentModel