const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/backSystem')
const db = mongoose.connection
db.on('error', () => {
  console.log('database connect error')
})
db.once('open', () => {
  console.log('database connect success')
})
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatar: String
})
const articleSchema = new mongoose.Schema({
  id: String,
  user_name: String,
  create_time: Date,
  update_time: Date,
  title: String,
  content: String,
  contentHtml: String
})
const models = {
  user: mongoose.model('user', userSchema),
  article: mongoose.model('article', articleSchema)
}
module.exports = models
