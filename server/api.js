const express = require('express')
const models = require('./schema')
const svgCaptcha = require('svg-captcha')
const router = express.Router()
router.get('/', (req, res) => {
  res.sendfile('./dist/index.html')
})
// 生成验证码
router.get('/back_manage/api/captcha', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.header('Access-Control-Request-Method', 'GET')
  let captcha = svgCaptcha.create({
    noise: 4,
    width: 120,
    height: 38
  })
  captcha.result = 1
  res.send(captcha).end()
})
// 登陆
router.post('/back_manage/api/login', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.header('Access-Control-Request-Method', 'POST')
  models.user.find({
    name: req.body.name,
    password: req.body.password
  }, (err, data) => {
    if (err) {
      res.send(err)
      next()
    }
    if (data.length) {
      res.send({
        result: 1,
        msg: '登陆成功'
      }).end()
    } else {
      res.send({
        result: 2,
        msg: '账号或密码错误'
      }).end()
    }
  })
})
// 注册
router.post('/back_manage/api/register', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.header('Access-Control-Request-Method', 'POST')
  models.user.find({
    name: req.body.name
  }, (err, data) => {
    if (err) {
      res.send(err)
      next()
    }
    if (data.length) {
      res.send({
        result: 2,
        msg: '该账号已存在'
      }).end()
    } else {
      let newUser = {
        name: req.body.name,
        password: req.body.password
      }
      models.user(newUser).save()
        .then(() => {
          res.send({
            result: 1,
            msg: '注册成功,请登录'
          }).end()
        })
        .catch(err => {
          res.send(err)
        })
    }
  })
})
module.exports = router
