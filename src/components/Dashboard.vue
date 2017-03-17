<template>
  <div class="Dashboard">
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
        <h2 class="title">{{rule.name}}</h2>
        <div class="code">
          <pre>{{rule.script}}</pre>
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
      allRules: [],
      displayedRules: [],
      allClients: [],
      selectedClient: {}
    }
  },
  mounted () {
    this.loadRules()
    this.loadClients()
  },
  methods: {
    clientSelected () {
      return Object.keys(this.selectedClient).length !== 0
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
  display: flex;
  align-items: stretch;
  height: 100%;
}

.Dashboard-client-list {
  background: #333;
  color: #FFF;
  width: 300px;
}

.Dashboard-client {
  padding: 25px;
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
  margin: 0;
}

.Dashboard-client p {
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
}

.Dashboard-rule h2.title {
  font-size: 20px;
  background: #FFF;
  margin: 0;
  padding: 10px 25px;
  border-bottom: solid 1px #EFEFEF;
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
</style>
