import vuex from "../vuex/store";
import router from "../router/index";

export function registerPlugins(app) {
  app.use(router).use(vuex);
}
