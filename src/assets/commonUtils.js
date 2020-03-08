import qs from 'qs'
export default {
  install (Vue, { axios, router }) {
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
    Vue.prototype.$formatDate = (date, format='yyyy-mm-dd HH:MM') => {
      if(!date||isNaN(date)){
          return ''
      }
      date = new Date(date);
      const regArray = [
          {
              reg:/y+/,
              value: date.getFullYear()
          },
          {
              reg:/m+/,
              value: date.getMonth()+1 >= 10 ? date.getMonth()+1 : '0' + (date.getMonth()+1)
          },
          {
              reg:/d+/,
              value: date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
          },
          {
              reg:/H+/,
              value: date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
          },
          {
              reg:/MM+/,
              value: date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
          },
          {
              reg:/S+/,
              value: date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
          }
      ]
      let newDate = format
      for(let item of regArray){
          newDate = newDate.replace(item.reg,item.value)
      }
      return newDate
    }
    function checkTimeout (data) {
      if (data.result === 0) {
        return Vue.prototype.$alert('你未登录或登录信息已失效', '提示', {
          type: 'warning',
          callback: () => {
            router.push('/')
          }
        })
      } else {
        return data
      }
    }
    function encodeFormData (data) {
      let formData = new FormData()
      for (let key in data) {
        formData.append(key, data[key])
      }
      return formData
    }

    class HttpRequest {
      get (url) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'get',
            url,
            withCredentials: true
          }).then(res => {
            url.indexOf('back_manage/api/logout') !== -1 ? resolve(checkTimeout(res.data)) : resolve(res.data)
            resolve(checkTimeout(res.data))
          }).catch(err => {
            reject(err)
          })
        })
      }
      postJSON (url, data) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url,
            data,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          }).then(res => {
            resolve(checkTimeout(res.data))
          }).catch(err => {
            reject(err)
          })
        })
      }
      postForm (url, data) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url,
            data: qs.stringify(data),
            withCredentials: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }
          }).then(res => {
            resolve(checkTimeout(res.data))
          }).catch(err => {
            reject(err)
          })
        })
      }
      postFile (url, data) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url,
            data: encodeFormData(data),
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
          }).then(res => {
            resolve(checkTimeout(res.data))
          }).catch(err => {
            reject(err)
          })
        })
      }
    }
    Vue.prototype.$http = new HttpRequest()
  }
}
