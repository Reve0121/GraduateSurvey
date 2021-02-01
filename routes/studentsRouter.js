const express = require('express');
const router = express.Router();

const studentModel = require('../modules/students')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource12333');
});

// 查询所有
router.get('/all', function (req, res, next) {
  studentModel.find({}).limit(100)
    .then(result => {
      res.json({ "data": result })
    });
})




// 查询
router.get('/find', function (req, res, next) {
  studentModel.find({ studentId: req.query.id })
    .then(result => {
      res.json({ "data": result })
    });
})

module.exports = router;
