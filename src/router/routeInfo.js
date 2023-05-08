import NotfoundView from "../views/NotFound.vue";
import StartView from "../views/Start.vue";
import HomeView from "../views/Home.vue";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";

export default {
  Start: {
    path: "/",
    name: "StartView",
    component: StartView,
  },
  Home: {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  Login: {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  Register: {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  NotFound: {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotfoundView,
  },
};
