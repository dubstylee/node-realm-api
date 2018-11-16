<template>
  <div class="login">
    <h3>Enter E-mail Address</h3>
    <v-form>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6>
          <v-text-field v-model="email" :rules="[rules.email]" ref="email" />
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
      email: "",
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    };
  },
  methods: {
    reset(event) {
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(() => { // (res)
        this.$router.replace("/login");
      })
      .catch((err) => {
        alert("Ooops " + err.message);
      });

      event.preventDefault();
    }
  },
  mounted() {
    this.$refs.email.focus();
  }
};
</script>

<style scoped>
</style>
