import Router from "vue-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Companies from "./components/Companies";
import ResetPassword from "./components/ResetPassword";
import * as firebase from "firebase/app";

const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      component: Dashboard
    },
    {
      path: "/companies",
      component: Companies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/reset",
      component: ResetPassword
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("login");
  } else {
    next();
  }
});

export default router;
