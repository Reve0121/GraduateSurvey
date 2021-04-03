/**
 * define question schema
 */
const { Double } = require("mongodb");
const mongoose = require("mongoose");

const question = {
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
  //是否必填
  required: {
    type: Boolean,
    default: true,
  },
  //等级
  level: {
    type: Number,
    default: 1,
  },
  //是否显示
  active: {
    type: Boolean,
    default: true,
  },
  //序列号
  serialNumber: Number,
  //创建日期
  createDate: Date,
  //更新日期
  updateDate: Date,
  //显隐状态
  status: {
    type: Boolean,
  },
};
module.exports = mongoose.Schema(question);
