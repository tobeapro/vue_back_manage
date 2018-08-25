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
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.component('icon', Icon)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(CommonUtils)
Vue.use(mavonEditor)
Vue.config.productionTip = false

const DEVSERVER = 'http://localhost:4000/'
const PRODSERVER = '/'
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.ROOTSERVER = DEVSERVER
  global.APIHOST = DEVSERVER + 'back_manage/'
} else if (process.env.NODE_ENV === 'production') {
  Vue.prototype.ROOTSERVER = PRODSERVER
  global.APIHOST = PRODSERVER + 'back_manage/'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
