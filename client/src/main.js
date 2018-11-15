import Vue from "vue";
import Router from "vue-router";
import Vuetify from "vuetify";
import App from "./App.vue";

import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import * as firebase from "firebase/app";
import router from "./routes";
import config from "../config/keys";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Router);

var app;

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  }
});
