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
  studentModel.find({ studentId: req.query.id }).then((result) => {
    res.json(Res.initSuccessRes({ result: result, message: "查询成功" }));
  });
});

module.exports = router;
