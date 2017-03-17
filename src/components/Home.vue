<template>
  <div class="Home">
    <div class="logo">
      <img src="https://cdn.auth0.com/styleguide/latest/img/logo.png" />
    </div>
    <h1>Rules Manager</h1>
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
      lock: new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, {
        auth: {
          redirect: false
        }
      })
    }
  },
  mounted () {
    this.authenticated = this.checkAuth()
    this.lock.on('authenticated', (authResult) => {
      if (authResult.error) {
        return
      }
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

.Home {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  margin-bottom: 20px;
}

.logo img {
  width: 150px;
  height: auto;
}
</style>
