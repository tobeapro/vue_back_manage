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
            withCredentials: true,
            timeout: 6000
          }).then(res => {
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
            data: JSON.stringify(data),
            withCredentials: true,
            timeout: 6000,
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
            timeout: 6000,
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
            timeout: 6000,
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
