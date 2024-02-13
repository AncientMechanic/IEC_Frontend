import NotfoundView from "../views/NotFound.vue";
import StartView from "../views/Start.vue";
import HomeView from "../views/Home.vue";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import UsersView from "../views/Users.vue";
import ListsView from "../views/Lists.vue";
import TasksView from "../views/Tasks.vue";
import UserView from "../views/User.vue";

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
  Users: {
    path: "/users",
    name: "Users",
    component: UsersView,
  },
  Lists: {
    path: "/lists",
    name: "Lists",
    component: ListsView,
  },
  Tasks: {
    path: "/tasks",
    name: "Tasks",
    component: TasksView,
  },
  NotFound: {
    path: "/:catchAll(.*)",
    name: "NotFoundView",
    component: NotfoundView,
  },
  User: {
    path: "/user/:id",
    name: "User",
    component: UserView,
  },
};
