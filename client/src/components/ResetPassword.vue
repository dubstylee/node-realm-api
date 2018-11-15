<template>
  <div class="login">
    <h3>Enter E-mail Address</h3>
    <v-form>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6>
          <v-text-field v-model="email" :type="'text'"></v-text-field>
        </v-flex>
      </v-layout>
      <v-btn color="info" type="submit" @click="reset">Reset Password</v-btn>
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
      email: ""
    };
  },
  methods: {
    reset(event) {
      firebase.auth().sendPasswordResetEmail(this.email)
      .then((res) => {
        this.$router.replace("/login");
      })
      .catch((err) => {
        alert("Ooops " + err.message);
      });

      event.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>
