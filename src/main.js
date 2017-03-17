// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import App from './App'
import router from './router'

Vue.use(VueResource)
Vue.use(VueLocalStorage)

Vue.config.productionTip = false

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  localStorage: {},
  template: '<App/>',
  components: { App }
})
