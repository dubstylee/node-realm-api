<template>
  <v-app id="app">
    <div>
      <a href="/"><img src="./assets/logo.png"></a>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "app",
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
}
</style>
