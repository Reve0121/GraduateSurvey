const express = require("express");
const router = express.Router();
const Res = require("../modules/response");
const studentModel = require("../modules/students");

// 查询所有
router.post("/all", async function (req, res, next) {
  let pageCount = (req.body.pageIndex - 1) * req.body.pageSize;
  let count = await studentModel.count();

  let result = await studentModel
    .find({})
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
router.get("/find", function (req, res, next) {
  console.log("req.body", req.body.id);
  studentModel.find({ studentId: req.body.id }).then((result) => {
    console.log("result", result);
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
module.exports = router;
