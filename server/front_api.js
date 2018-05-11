const express = require('express')
const models = require('./schema')
const router = express.Router()
// 获取文章
router.post('/front_manage/api/getArticles',(req,res,next)=>{
	models.article.find({user_name:req.body.name},(err,data)=>{
		if(err){
			res.send(err)
			next()
		}
		if(data){
			res.send({result:1,list:data})
		}else{
			res.send({result:1,list:[]})
		}
	})
})
module.exports = router