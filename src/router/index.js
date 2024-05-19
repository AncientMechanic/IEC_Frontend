import { createRouter, createWebHistory } from "vue-router";
import routeInfo from "./routeInfo";
import authorized from "./middleware/authorized";
import guest from "./middleware/guest";
import middlewarePipeline from "./middlewarePipeline";
import store from "../vuex/store";

const routes = [
  {
    path: routeInfo.Start.path,
    name: routeInfo.Start.name,
    component: () => routeInfo.Start.component,
  },
  {
    path: routeInfo.Login.path,
    name: routeInfo.Login.name,
    component: () => routeInfo.Login.component,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: routeInfo.Register.path,
    name: routeInfo.Register.name,
    component: () => routeInfo.Register.component,
    meta: {
      middleware: [guest],
    },
  },
  {
    path: routeInfo.NotFound.path,
    name: routeInfo.NotFound.name,
    component: () => routeInfo.NotFound.component,
  },
  {
    path: routeInfo.Users.path,
    name: routeInfo.Users.name,
    component: () => routeInfo.Users.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.Participants.path,
    name: routeInfo.Participants.name,
    component: () => routeInfo.Participants.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.Employers.path,
    name: routeInfo.Employers.name,
    component: () => routeInfo.Employers.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.User.path,
    name: routeInfo.User.name,
    component: () => routeInfo.User.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.CurrentParticipant.path,
    name: routeInfo.CurrentParticipant.name,
    component: () => routeInfo.CurrentParticipant.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.CurrentEmployer.path,
    name: routeInfo.CurrentEmployer.name,
    component: () => routeInfo.CurrentEmployer.component,
    meta: {
      middleware: [authorized],
    },
  },
  {
    path: routeInfo.Query.path,
    name: routeInfo.Query.name,
    component: () => routeInfo.Query.component,
    meta: {
      middleware: [authorized],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  
  window.scrollTo(0, 0);
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
