import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import './assets/common.less'
import axios from 'axios'
import CommonUtils from './assets/commonUtils'
import mavonEditor from 'mavon-editor'

Vue.use(ElementUI)
Vue.use(CommonUtils, { axios, router })
Vue.use(mavonEditor)
Vue.config.productionTip = false

const DEVSERVER = 'http://localhost:4000'
const PRODSERVER = ''
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.ROOTSERVER = DEVSERVER
  global.APIHOST = DEVSERVER + 'back_manage/'
} else if (process.env.NODE_ENV === 'production') {
  Vue.prototype.ROOTSERVER = PRODSERVER
  global.APIHOST = PRODSERVER + 'back_manage/'
}
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
