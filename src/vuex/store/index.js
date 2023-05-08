import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";
import plugins from "./plugins";
import { createStore } from "vuex";

import auth from "../modules/auth";

export default createStore({
  modules: { auth },
  state,
  mutations,
  actions,
  getters,
  plugins,
});
