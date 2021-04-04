const express = require("express");

const router = express.Router();
const questionModel = require("../modules/questions");
const Res = require("../modules/response");
const _ = require("lodash");
const UpdataQuestionWords = [
  "question",
  "answerA",
  "answerB",
  "answerC",
  "answerD",
  "level",
  "required",
  "active",
  "serialNumber",
];

const ObjectID = require("mongodb").ObjectID;
//查询
router.get("/all", function (req, res, next) {
  questionModel
    .find({ status: true })
    .sort({ serialNumber: 1 })
    .then((result) => {
      console.log(result);
      res.json(Res.initSuccessRes({ result: result, message: "添加成功" }));
    });
});

//查询单个
router.post("/findOne", async function (req, res, next) {
  console.log("findOne---->", req.body);
  let whereStr = { _id: ObjectID(req.body.id) }; // 查询条件
  console.log("whereStr----->", whereStr);
  let resData = await questionModel.find(whereStr);
  console.log(resData);
  res.json(Res.initSuccessRes({ result: resData, message: "查询成功" }));
});
//新增一条记录
router.post("/add", async function (req, res, next) {
  let count = await questionModel.count({}, function (err, count) {
    if (err) return;
    console.log("there are %d records", count);
  });
  req.body.serialNumber = count + 1;
  req.body.createDate = req.body.updateDate = new Date().toISOString();
  req.body.status = true;
  console.log(req.body);
  let arr = [req.body];
  questionModel.insertMany(arr, function (error, docs) {
    if (!error) {
      console.log(docs);
      res.json(Res.initSuccessRes({ result: docs, message: "添加成功" }));
    }
  });
});
//更新
router.post("/update", async function (req, res, next) {
  console.log("update---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { _id: ObjectID(req.body._id) };
  let updateStr = { $set: req.body, $currentDate: { lastModified: true } };
  let restemp = await questionModel.updateOne(whereStr, updateStr);
  console.log("restemp", restemp);
  res.json(Res.initSuccessRes({ result: restemp, message: "修改成功" }));
});

//删除
router.post("/delete", async function (req, res, next) {
  console.log("delete---->", req.body);
  // req.body.updateDate = new Date().toISOString();
  let deleteArr = req.body.map((item) => {
    return ObjectID(item._id);
  });
  console.log("deleteArr---->", deleteArr);
  let whereStr = { _id: { $in: deleteArr } };
  let updateStr = { $set: { status: false }, $currentDate: { lastModified: true } };
  let restemp = await questionModel.updateMany(whereStr, updateStr);

  console.log("restemp", restemp);
  res.json(Res.initSuccessRes({ result: restemp, message: "修改成功" }));
});

module.exports = router;
