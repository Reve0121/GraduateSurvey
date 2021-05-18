const express = require("express");

const router = express.Router();
const answersModel = require("../modules/answers");
const Res = require("../modules/response");
const ObjectID = require("mongodb").ObjectID;

//查询
router.get("/all", function (req, res, next) {
  answersModel
    .find({ status: true })
    .sort({ serialNumber: 1 })
    .then((result) => {
      console.log(result);
      res.json(Res.initSuccessRes({ result: result, message: "查询成功" }));
    });
});
//查询单个
router.post("/findOne", async function (req, res, next) {
  console.log("find---->", req.body);
  let whereStr = { studentId: req.body.id }; // 查询条件
  console.log("whereStr----->", whereStr);
  let resData = await answersModel.find(whereStr);
  console.log(resData);
  res.json(Res.initSuccessRes({ result: resData, message: "查询成功" }));
});

//新增一条记录
router.post("/add", async function (req, res, next) {
  req.body.createDate = req.body.updateDate = new Date().toISOString();

  console.log(req.body);
  let arr = [req.body];
  answersModel.insertMany(arr, function (error, docs) {
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
  let restemp = await answersModel.updateOne(whereStr, updateStr);
  console.log("restemp", restemp);
  res.json(Res.initSuccessRes({ result: restemp, message: "修改成功" }));
});
//统计各问

router.post("/countA", async function (req, res, next) {
  console.log("countA---->", req.body);
  console.log("req.body._id---->", req.body._id, ObjectID(req.body._id));
  let whereStr = { "survey._id": ObjectID(req.body._id), "survey.result": "answerA" };
  let resData = await answersModel.aggregate([{ $unwind: "$survey" },
  { $match: whereStr },
  {
    $project: {
      "survey.result": 1,
      "survey._id": 1,
    }
  },
  {
    $group:
      { _id: null, total: { $sum: 1 } }
  }]);
  console.log(resData);
  let response = {
    id: req.body._id,
    total: resData[0].total
  }
  if (resData && resData.length > 0) {
    response.total = resData[0].total
  }
  res.json(Res.initSuccessRes({ result: response, message: "计数A" }));
});

router.post("/countB", async function (req, res, next) {
  console.log("countB---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { "survey._id": ObjectID(req.body._id), "survey.result": "answerB" };
  let resData = await answersModel.aggregate([{ $unwind: "$survey" },
  { $match: whereStr },
  {
    $project: {
      "survey.result": 1,
      "survey._id": 1,
    }
  },
  {
    $group:
      { _id: null, total: { $sum: 1 } }
  }]);
  console.log(resData);
  let response = {
    id: req.body._id,
    total: resData[0].total
  }
  if (resData && resData.length > 0) {
    response.total = resData[0].total
  }
  res.json(Res.initSuccessRes({ result: response, message: "计数B" }));
});

router.post("/countC", async function (req, res, next) {
  console.log("countC---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { "survey._id": ObjectID(req.body._id), "survey.result": "answerC" };
  let resData = await answersModel.aggregate([{ $unwind: "$survey" },
  { $match: whereStr },
  {
    $project: {
      "survey.result": 1,
      "survey._id": 1,
    }
  },
  {
    $group:
      { _id: null, total: { $sum: 1 } }
  }]);
  console.log(resData);
  let response = {
    id: req.body._id,
    total: resData[0].total
  }
  if (resData && resData.length > 0) {
    response.total = resData[0].total
  }
  res.json(Res.initSuccessRes({ result: response, message: "计数C" }));
});


router.post("/countD", async function (req, res, next) {
  console.log("countD---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { "survey._id": ObjectID(req.body._id), "survey.result": "answerC" };
  let resData = await answersModel.aggregate([{ $unwind: "$survey" },
  { $match: whereStr },
  {
    $project: {
      "survey.result": 1,
      "survey._id": 1,
    }
  },
  {
    $group:
      { _id: null, total: { $sum: 1 } }
  }]);
  console.log(resData);
  let response = {
    id: req.body._id,
    total: resData[0].total
  }
  if (resData && resData.length > 0) {
    response.total = resData[0].total
  }
  res.json(Res.initSuccessRes({ result: response, message: "计数D" }));
});

module.exports = router;
