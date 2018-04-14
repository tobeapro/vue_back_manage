// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/common.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
import Icon from 'vue-awesome/components/Icon'
import CommonUtils from './assets/commonUtils'
Vue.component('icon', Icon)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(CommonUtils)
Vue.config.productionTip = false

const DEVSERVER = 'http://localhost:4000/back_manage/'
// const MOCKSERVER = ' https://easy-mock.com/mock/5ac1c0ef1756cd3c4ce8f562/back_manage/'
const PRODSERVER = '/back_manage/'
if (process.env.NODE_ENV === 'development') {
  global.APIHOST = DEVSERVER
} else if (process.env.NODE_ENV === 'production') {
  global.APIHOST = PRODSERVER
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
