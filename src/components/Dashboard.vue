<template>
  <div class="Dashboard">
    <header v-if="authenticated">
      <h1>Rules Manager</h1>
      <div class="user-menu">
        <div class="user-name">{{profile.name}}</div>
        <div class="logout-link"><a @click="logout">Logout</a></div>
      </div>
    </header>
    <div class="body-section">
      <div class="Dashboard-client-list">
        <div class="Dashboard-client" v-for="client in allClients" @click="selectClient(client)" v-bind:class="{ selected: isSelectedClient(client) }">
          <h3>{{client.name}}</h3>
          <p>{{client.tenant}}.auth0.com</p>
        </div>
      </div>
      <div class="Dashboard-rule-list">
        <div class="Dashboard-empty" v-if="!displayedRules.length">
          <p v-if="!clientSelected()">Click on a client to see associated rules</p>
          <p v-if="clientSelected()">This client has no associated rules</p>
        </div>
        <div class="Dashboard-rule" v-if="displayedRules.length" v-for="rule in displayedRules">
          <div class="title">
            <h2>{{rule.name}}</h2>
            <i class="zmdi zmdi-chevron-down" @click="expandRule(rule)"></i>
          </div>
          <div class="code" v-if="isExpandedRule(rule)">
            <pre>{{rule.script}}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Rules from '@/services/Rules.js'
import Clients from '@/services/Clients.js'

export default {
  data () {
    return {
      authenticated: false,
      profile: {},
      allRules: [],
      displayedRules: [],
      expandedRule: {},
      allClients: [],
      selectedClient: {}
    }
  },
  mounted () {
    this.authenticated = this.checkAuth()
    if (this.authenticated) {
      this.loadRules()
      this.loadClients()
    } else {
      this.logout()
    }
  },
  methods: {
    checkAuth () {
      if (!this.$localStorage.get('id_token')) {
        return false
      }
      try {
        this.profile = JSON.parse(this.$localStorage.get('profile'))
        return true
      } catch (e) {
        return false
      }
    },
    logout () {
      this.$localStorage.remove('profile')
      this.$localStorage.remove('id_token')
      this.authenticated = false
      this.$router.push('/')
    },
    parseImageUrl (encodedUri) {
      return decodeURIComponent(encodedUri)
    },
    clientSelected () {
      return Object.keys(this.selectedClient).length !== 0
    },
    expandRule (rule) {
      this.expandedRule = rule
    },
    isExpandedRule (rule) {
      return this.expandedRule.id === rule.id
    },
    selectClient (client) {
      this.selectedClient = client
      this.filterRules(client)
    },
    isSelectedClient (client) {
      return this.selectedClient.client_id === client.client_id
    },
    filterRules (client) {
      var re = new RegExp(client.name)
      this.displayedRules = this.allRules.filter((rule) => {
        return rule.script.search(re) !== -1
      })
      this.expandedRule = this.displayedRules[0] || {}
    },
    loadRules () {
      Rules.$r().query().then((response) => {
        this.allRules = response.body
      })
    },
    loadClients () {
      Clients.$r().query().then((response) => {
        this.allClients = response.body
      })
    }
  }
}
</script>

<style>
.Dashboard {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.Dashboard-client-list {
  background: #333;
  color: #FFF;
  width: 300px;
}

.Dashboard-client {
  padding: 15px 25px;
  border-bottom: solid 1px #444;
  cursor: pointer;
}

.Dashboard-client:hover {
  background: #444;
}

.Dashboard-client.selected {
  background: #F9F9F9;
  color: #232323;
}

.Dashboard-client h3 {
  font-size: 15px;
  margin: 0;
}

.Dashboard-client p {
  font-size: 13px;
  margin: 0;
}

.Dashboard-rule-list {
  position: relative;
  flex-grow: 1;
  padding: 20px;
}

.Dashboard-rule {
  background: #F9F9F9;
  border: solid 1px #EFEFEF;
  border-left: solid 10px #EB5424;
  margin-bottom: 10px;
}

.Dashboard-rule .title {
  display: flex;
  align-items: center;
  background: #FFF;
  padding: 10px 25px;
  border-bottom: solid 1px #EFEFEF;
}

.Dashboard-rule .title h2 {
  margin: 0;
  font-size: 20px;
  flex-grow: 1;
}

.Dashboard-rule .title i {
  font-size: 25px;
  cursor: pointer;
}

.Dashboard-rule .code {
  padding: 15px 30px;
}

.Dashboard-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
  height: 80px;
  padding: 0 25px;
  background: #F3F5F7;
}

header h1 {
  font-size: 24px;
  font-weight: 100;
  flex-grow: 1;
}

.user-menu {
  display: flex;
  align-items: center;
  font-size: 13px;
}

.user-image {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-right: 15px;
}

.user-name {
  margin-right: 15px;
  background: #232323;
  border-radius: 50px;
  padding: 7px 15px;
  color: #FFF;
}

.logout-link {
  cursor: pointer;
}

.body-section {
  display: flex;
  position: relative;
  flex-grow: 1;
}
</style>
