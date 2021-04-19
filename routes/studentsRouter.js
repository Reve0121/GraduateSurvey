const express = require("express");
const router = express.Router();
const Res = require("../modules/response");
const studentModel = require("../modules/students");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource12333");
});

// 查询所有
router.post("/all", async function (req, res, next) {
  let pageCount = (req.body.pageIndex-1) * req.body.pageSize;
  let count = await studentModel.countDocuments();

  let result = await studentModel
    .find({exit:true})
    .skip(pageCount)
    .limit(req.body.pageSize);

  let resData = {
    count: count,
    students: result,
  };
  console.log("resData ---->", resData);
  res.json(Res.initSuccessRes({ result: resData, message: "查询成功" }));
});

// 查询
router.post("/find", function (req, res, next) {
  studentModel.find({ studentId: req.body.studentId,"exit":true}).then((result) => {
    console.log("result----->",result);
    res.json(Res.initSuccessRes({ result: result, message: "查询成功" }));
  });

});

//学生登陆
router.post("/login", function (req, res, next) {
  console.log("req.body", req.body);

  studentModel.findOne({ studentId: req.body.id }).then((result) => {
    console.log("result", result);
    let data = false,
      message = "登录失败";

    if ( result != null && req.body.password === result.phone) {
      data = true;
      message = "登录成功";
    }
    res.json(Res.initSuccessRes({ result: data, message: message }));
  });
});

//增添
router.post("/add", async function (req, res, next) {
  let count = await studentModel.count({}, function (err, count) {
    if (err) return;
    console.log("there are %d records", count);
  });
  req.body.serialNumber = count + 1;
  req.body.createDate = req.body.updateDate = new Date().toISOString();
  req.body.exit = true;
  console.log("req.body----->",req.body);
  let arr = [req.body];
  studentModel.insertMany(arr, function (error, docs) {
    if (!error) {
      console.log("response",docs);
      res.json(Res.initSuccessRes({ result: docs, message: "添加成功" }));
    }
  });
});
//删除
router.post("/delete", async function (req, res, next) {
  console.log("delete---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { studentId: req.body.id };
  let updateStr = { $set: { exit: false }, $currentDate: { lastModified: true } };
  let restemp = await studentModel.updateOne(whereStr, updateStr);
  console.log("restemp", restemp);
  res.json(Res.initSuccessRes({ result: restemp, message: "删除成功" }));
});

//更新
router.post("/update", async function (req, res, next) {
  console.log("update---->", req.body);
  req.body.updateDate = new Date().toISOString();
  let whereStr = { studentId: req.body.studentId };
  let updateStr = { $set: req.body, $currentDate: { lastModified: true } };
  let restemp = await studentModel.updateOne(whereStr, updateStr);
  console.log("restemp", restemp);
  res.json(Res.initSuccessRes({ result: restemp, message: "修改成功" }));
});

module.exports = router;
