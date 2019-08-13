<template>
  <v-app id="app">
    <div>
      <app-header :user="user" @loggedOut="loggedOut" />
      <router-view @loggedIn="loggedIn" />
    </div>
  </v-app>
</template>

<script>
import Header from "./components/Header";
import * as firebase from "firebase/app";

export default {
  name: "app",
  created() {
    document.title = "Realm API";
  },
  components: {
    "app-header": Header
  },
  data() {
    return {
      user: firebase.auth().currentUser || {}
    };
  },
  methods: {
    loggedIn(user) {
      this.user = user;
    },
    loggedOut() {
      this.user = {};
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
