import Vue from 'vue'

const baseUrl = '/api/clients'

export default {
  $r () {
    return Vue.resource(baseUrl)
  }
}
