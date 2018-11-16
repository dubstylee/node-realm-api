<template>
  <div>
    <a href="/"><img src="../assets/logo.png"></a>
    <template v-if="user">
      <v-btn @click="logout">Logout</v-btn>
    </template>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

function logout() {
  firebase.auth().signOut().then(() => {
    this.user = null;
    this.$router.replace("login");
  });
}

export default {
  name: "Header",
  data() {
    return {
      user: firebase.auth().currentUser
    };
  },
  methods: {
    logout
  }
};
</script>

<style>
</style>
