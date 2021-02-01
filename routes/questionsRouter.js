const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const questionModel = require('../modules/questions');
const Res = require('../modules/response')
const _ = require('lodash');
const UpdataQuestionWords = ["question", "answerA", "answerB", "answerC", "answerD", "level", "required", "active", "serialNumber"]
//查询
router.get('/all', function (req, res, next) {
    questionModel.find({}).sort({ serialNumber: 1 }).then(result => {
        console.log(result)
        res.json(Res.initSuccessRes({ result: result, message: "添加成功" }))
    })
})

router.post('/add', async function (req, res, next) {

    let count = await questionModel.count({}, function (err, count) {
        if (err) return
        console.log('there are %d records', count);
    });
    req.body.serialNumber = count + 1;
    req.body.createDate = req.body.updateDate = new Date().toISOString()

    console.log(req.body)
    let arr = [req.body];
    questionModel.insertMany(arr, function (error, docs) {
        if (!error) {
            console.log(docs)
            res.json(Res.initSuccessRes({ result: docs, message: "添加成功" }))
        }
    });
})
router.post('/update', async function (req, res, next) {
    console.log("update", req.body)


    req.body.updateDate = new Date().toISOString()
    let restemp = await questionModel.findByIdAndUpdate({ _id: req.body._id }, { $set: _.pick(req.body, UpdataQuestionWords) }, { new: true })

    console.log("restemp", restemp)
    res.json(Res.initSuccessRes({ result: restemp, message: "修改成功" }))


})


module.exports = router
