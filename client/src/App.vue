<template>
  <v-app id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Dashboard title="Realm API" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    Dashboard,
    HelloWorld
  },
  created() {
    document.title = "Realm API";
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
  margin-top: 60px;
}
</style>
