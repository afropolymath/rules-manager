import Vue from 'vue'

const baseUrl = '/api/rules'

export default {
  $r () {
    return Vue.resource(baseUrl)
  }
}
