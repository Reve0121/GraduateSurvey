const express = require('express');
const router = express.Router();
const questionModel = require('../modules/questions');


//查询
router.get('/all',function(req,res,next){
    questionModel.find({}).then(result=>{
        res.json({data:result})
    })
})

module.exports = router
