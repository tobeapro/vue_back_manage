const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const api = require('./api')
const frontApi = require('./front_api')
const app = express()
const port = 4000
// 提交参数为任意类型
app.use(bodyParser.urlencoded({extented: true}))
// 模板引擎
app.set('view engine', 'html')
// 静态资源目录
app.use(express.static(path.join(__dirname, './dist')))
app.use('/public', express.static(path.join(__dirname, './public')))
// 应用cookie
// app.use(cookieParser())
// 应用session
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 100// 设置 session 的有效时间，单位毫秒
  }
}))
// 配置CORS
const allowCrossDomain = function(req, res, next) {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
   res.header('Access-Control-Allow-Headers', 'Content-Type')
   next()
}
app.use(allowCrossDomain)
// 引用api
app.use(api)
app.use(frontApi)
app.listen(port, () => {
  console.log('listen on localhost:' + port)
})
