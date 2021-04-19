/**
 * define question schema
 */
const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const answer = {
  //学生ID
  studentId: String,
  //问卷
  survey: [
    {
      _id: ObjectID,
      //问题
      question: String,
      //答案A
      answerA: String,
      //答案B
      answerB: String,
      //答案C
      answerC: String,
      //答案D
      answerD: String,
      //答案
      result: String,
    },
  ],
  //问卷状态 0 未完成 1 未提交 2 已完成
  status: {
    type: Number,
    default: 0,
  },
  //是否显示
  active: {
    type: Boolean,
    default: true,
  },

  //创建日期
  createDate: Date,
  //更新日期
  updateDate: Date,
};
module.exports = mongoose.Schema(answer);
