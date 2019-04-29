// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/css/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/fontSize.js'
import baseUrl from './service/api.config'


Vue.use(ElementUI);
Vue.use(VueAxios,axios);
axios.defaults.baseURL = baseUrl;
console.log(axios.defaults)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
