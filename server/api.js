const express = require('express')
const models = require('./schema')
const svgCaptcha = require('svg-captcha')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const router = express.Router()
router.get('/', (req, res) => {
  res.sendfile('./dist/index.html')
})
router.get('/hello', (req, res) => {
  res.send('123')
})
// 生成验证码
router.get('/back_manage/api/captcha', (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  // res.header('Access-Control-Request-Method', 'GET')
  let captcha = svgCaptcha.create({
    noise: 2,
    ignoreChars: '0o1i',
    width: 120,
    height: 36,
    fontSize: 40
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
      if (req.session.isLogin && req.session.name === req.body.name) {
        res.send({
          result: 1,
          msg: '欢迎回来'
        }).end()
      } else {
        req.session.isLogin = true
        req.session.name = req.body.name
        res.send({
          result: 1,
          msg: '登陆成功'
        }).end()
      }
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
// 用户详情
router.get('/back_manage/api/getInfo', (req, res, next) => {
  if (req.session.isLogin && req.session.name) {
    models.user.findOne({name: req.session.name}, {password: 0}, (err, data) => {
      if (err) {
        res.send(err)
        next()
      }
      if (data) {
        delete data.password
        res.send({result: 1, data: data})
      } else {
        res.send({msg: '用户不存在'})
      }
    })
  } else {
    res.send({result: 0, msg: '请重新登录'})
  }
})
// 上传头像
router.post('/back_manage/api/upload_avatar', (req, res, next) => {
  if (!fs.existsSync(path.join(__dirname, '/public/resource'))) {
    fs.mkdirSync(path.join(__dirname, '/public/resource'))
  }
  const form = new formidable.IncomingForm()
  form.encoding = 'utf-8'
  form.keepExtensions = true
  form.uploadDir = path.join(__dirname, './public/resource')
  form.maxFieldsSize = 2 * 1024 * 1024
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send({result: 2, msg: '上传失败'})
    }
    models.user.findById(fields.id, (err, doc) => {
      if (err) {
        res.send({result: 2, msg: '上传失败'})
      }
      if (doc) {
        const imgPath = files.file.path
        const imgData = fs.readFileSync(imgPath)
        fs.writeFile(imgPath, imgData, err => {
          if (err) {
            res.send({result: 2, msg: '上传失败'})
          }
          models.user.update({_id: fields.id}, {avatar: 'http://localhost:4000/public/resource/' + path.basename(imgPath)}, (err) => {
            if (err) {
              res.send({result: 2, msg: '上传失败'})
            }
            res.send({result: 1, msg: '上传成功', url: 'http://localhost:4000/public/resource/' + path.basename(imgPath)})
          })
        })
      }
    })
  })
  form.on('error', err => {
    res.send({result: 2, msg: err})
  })
})
// 获取文章列表
router.get('/back_manage/api/articles', (req, res, next) => {
  if (req.session.isLogin && req.session.name) {
    models.article.find({user_name: req.session.name}, (err, data) => {
      if (err) {
        res.send(err)
        next()
      }
      if (data) {
        delete data.password
        res.send({result: 1, data: data})
      } else {
        res.send({result: 1, data: []})
      }
    })
  } else {
    res.send({result: 0, msg: '请重新登录'})
  }
})
module.exports = router
