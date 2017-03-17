<template>
  <div class="Home">
    <h1>Rules Dashboard Login</h1>
    <button @click="login()">Enter Rules Dashboard</button>
  </div>
</template>

<script>
import Auth0Lock from 'auth0-lock'

export default {
  name: 'home',
  data () {
    return {
      authenticated: false,
      lock: new Auth0Lock('l5ClHK3PirB6J8C3NFbE54bWlIBZKnsA', 'chidieberennadi.auth0.com', {
        auth: {
          redirect: false
        }
      })
    }
  },
  mounted () {
    this.authenticated = this.checkAuth()
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult)
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return
        }
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('profile', JSON.stringify(profile))
        this.$router.push('dashboard')
      })
    })
  },
  methods: {
    checkAuth () {
      return !!this.$localStorage.get('id_token')
    },
    login () {
      this.lock.show()
    }
  }
}
</script>

<style scoped>
button {
  background: #006699;
  color: #FFF;
  border: 0;
  font-size: 14px;
  padding: 15px 20px;
  cursor: pointer;
}
</style>
