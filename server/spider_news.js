const request = require('superagent')
const charset = require('superagent-charset')
const cheerio = require('cheerio')
const models = require('./schema')
const fs = require('fs')
charset(request)
async function reqHtml(url){
	console.log("开始爬取：" + url)
	return new Promise((resolve,reject) => {
		request.get(url)
		.charset('gbk')
		.end((err,res)=>{
			if(err){
				console.log(err)
				reject(err)
				return
			}
			const urlAry = url.split('/')
			const data = {}
			const $ = cheerio.load(res.text)
			data.title = $("#epContentLeft").find("h1").eq(0).text()
			data.content = $("#endText").html()
			data.date = $("#epContentLeft").find(".post_time_source").text()
			// console.log(data)
			console.log("成功爬取页面：" + url)
			// fs.writeFileSync(urlAry[urlAry.length-1].slice(0,-5)+'.txt',JSON.stringify(data),{encoding:'utf8'})
			resolve(data)
		})
	})
}
request.get('http://news.163.com/').end(async (err,res)=>{
	if(err){
		console.log(err)
		return
	}
	const $ = cheerio.load(res.text)
	const topNews = $("#js_top_news").find("a")
	let newsUrl = []
	topNews.each(function(i,item){
		newsUrl.push($(item).attr('href'))
	})
	let allContent = []
	for(let url of newsUrl){
		const data = await reqHtml(url)
		allContent.push(data)
	}
	// console.log(allContent)
	models.news.collection.insert(allContent,(err,doc)=>{
		if(err){
			console.log("save fail")
		}
	})
})