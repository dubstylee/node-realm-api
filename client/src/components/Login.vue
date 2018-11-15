<template>
  <div class="login">
    <h3>Sign In</h3>
    <v-form>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6>
          <v-text-field v-model="email" :type="'text'"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6>
          <v-text-field v-model="password" :type="'password'"></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn color="info" type="submit" @click="login">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(event) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        () => { // (user)
          this.$router.replace("/");
        },
        (err) => {
          alert("Ooops " + err.message);
        }
      );
      event.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>
