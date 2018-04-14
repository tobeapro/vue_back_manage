export default {
  install (Vue, options) {
    Vue.prototype.$countTime = (time) => {
      let now = new Date()
      time = new Date(time)
      if (now.getFullYear() - time.getFullYear() > 0) {
        return now.getFullYear() - time.getFullYear() + '年前'
      } else if (now.getMonth() - time.getMonth() > 0) {
        return now.getMonth() - time.getMonth() + '个月前'
      } else if (now.getDate() - time.getDate() > 0) {
        return now.getDate() - time.getDate() + '天前'
      } else if (now.getHours() - time.getHours() > 0) {
        return now.getHours() - time.getHours() + '小时前'
      } else if (now.getMinutes() - time.getMinutes() > 0) {
        return now.getMinutes() - time.getMinutes() + '分钟前'
      } else {
        return now.getSeconds() - time.getSeconds() + '秒前'
      }
    }
  }
}
