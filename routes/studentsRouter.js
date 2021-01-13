const express = require('express');
const router = express.Router();

const studentModel = require('../modules/students')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource12333');
});

// 查询所有
router.get('/all', function (req, res, next) {
  console.log('api all ', '---------->', req.query);
  studentModel.find()
    .then(result => {
      console.log(result);
      res.json({ "data": result })
    });
})

// 查询
router.get('/find', function (req, res, next) {
  console.log('api all ', '---------->', req.query);
  studentModel.find({ studentId: req.query.id })
    .then(result => {
      console.log(result);
      res.json({ "data": result })
    });
})

module.exports = router;
