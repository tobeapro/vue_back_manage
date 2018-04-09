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
  password: String
})
const models = {
  user: mongoose.model('user', userSchema)
}
module.exports = models
