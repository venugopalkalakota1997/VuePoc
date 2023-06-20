<script>
import Keycloak from "keycloak-js";
export default {
    name: 'loginComponent',
    pmounted() {
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
    <div id="app">
    </div>
</template>