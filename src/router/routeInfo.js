import NotfoundView from "../views/NotFound.vue";
import StartView from "../views/Start.vue";
import HomeView from "../views/Home.vue";
import LoginView from "../views/Login.vue";
import RegisterView from "../views/Register.vue";
import UsersView from "../views/Users.vue";
import ParticipantsView from "../views/Participants.vue";
import EmployersView from "../views/Employers.vue";
import UserView from "../views/User.vue";
import CurrentParticipantView from "../views/CurrentParticipant.vue";
import CurrentEmployerView from "../views/CurrentEmployer.vue";
import QueryView from "../views/Query.vue";

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
  Participants: {
    path: "/participants",
    name: "Participants",
    component: ParticipantsView,
    props: (route) => ({ filteredParticipants: route.params.filteredParticipants })
  },
  Employers: {
    path: "/employers",
    name: "Employers",
    component: EmployersView,
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
  CurrentParticipant: {
    path: "/participant/:id",
    name: "CurrentParticipant",
    component: CurrentParticipantView,
  },
  CurrentEmployer: {
    path: "/employer/:id",
    name: "CurrentEmployer",
    component: CurrentEmployerView,
  },
  Query: {
    path: "/query",
    name: "Query",
    component: QueryView,
  },
};
