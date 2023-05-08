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
    path: routeInfo.Home.path,
    name: routeInfo.Home.name,
    component: () => routeInfo.Home.component,
    meta: {
      middleware: [authorized],
    },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

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
