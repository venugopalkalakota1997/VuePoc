<script>
import Keycloak from "keycloak-js";

export default {
  name: 'nav-bar',
  mounted() {
    var initOptions = {
      realm: 'testvue',
      clientId: 'vuetest',
      url: 'http://localhost:8080/',
      'public-client': true,
      silentCheckSsoFallback: false
    };
    this.keycloak = new Keycloak(initOptions);
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        await this.keycloak.init({ onLoad: "check-sso" });
        this.isAuthenticated = this.keycloak.authenticated;
        if (this.keycloak.token) {
          window.localStorage.setItem('keycloakToken', this.keycloak.token);
        }
      } catch (error) {
        console.error('Error initializing Keycloak:', error);
      }
    },
    async authenticateAgainstKeycloak() {
      try {
        await this.initialize();
        if (!this.isAuthenticated) {
          this.keycloak.login();
        } else {
          console.log(this.keycloak);
          console.log('Authenticated');
        }
        if (this.keycloak.token) {
          window.localStorage.setItem('keycloakToken', this.keycloak.token);
        }
      } catch (error) {
        console.error('Error initializing Keycloak:', error);
      }
    },
    async login() {
     await this.authenticateAgainstKeycloak();
    //  console.log(this.isAuthenticated)
      this.$router.push('/all')
    },
    logout() {
      if (this.keycloak) {
        window.localStorage.clear();
        this.keycloak.logout({ redirectUri: window.location.origin});       
      }
    }
  },
  data() {
    return {
      keycloak: null,
      isAuthenticated: false
    };
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="/">coMakeIt</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="nav navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/add">Add User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/all">User List</a>
        </li>
      </ul>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li class="nav-item">
        <button class="btn btn-success nav-link" @click="login()" v-if="!isAuthenticated">LOGIN</button>
      </li>
      <li class="nav-item">
        <button class="btn btn-success nav-link" @click="logout()" v-if="isAuthenticated">LOGOUT</button>
      </li>
    </ul>
  </nav>
</template>
