<template>
  <div>
    <a href="/"><img src="../assets/logo.png"></a>
    <template v-if="Object.keys(user).length > 0">
      <br><v-btn @click="logout">Logout</v-btn>
    </template>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

function logout() {
  firebase.auth().signOut().then(() => {
    this.$router.replace("login");
    this.$emit("loggedOut");
  });
}

export default {
  name: "Header",
  data() {
    return { };
  },
  props: {
    user: Object
  },
  methods: {
    logout
  }
};
</script>

<style>
</style>
