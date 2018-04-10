const express = require('express')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
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
// 应用cookie
// app.use(cookieParser())
// 应用session
app.use(session({
  secret: 'secret', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 6// 设置 session 的有效时间，单位毫秒
  }
}))
// 引用api
app.use(api)
app.listen(port, () => {
  console.log('listen on localhost:' + port)
})
