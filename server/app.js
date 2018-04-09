const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./api')
const app = express()
const port = 4000
// 提交参数为任意类型
app.use(bodyParser.urlencoded({extented: true}))
// 模板引擎
app.set('view engine', 'html')
// 静态资源目录
app.use('/static', express.static(path.join(__dirname, './dist/static')))
// 引用api
app.use(api)
app.listen(port, () => {
  console.log('listen on localhost:' + port)
})
