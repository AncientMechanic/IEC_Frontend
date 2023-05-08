import myMmDbApi from "../../../api/myMmDbApi";
import routeInfo from "../../../router/routeInfo";
import { mutations as mutationTypes, actions as actionTypes } from "./types";
import router from "../../../router";

export default {
  [actionTypes.AUTH_REQUEST]({ commit }, data) {
    myMmDbApi()
      .auth(data)
      .then((result) => {
        commit(mutationTypes.SET_AUTH_TOKEN, result.data);
        router.push({ path: routeInfo.Home.path, name: routeInfo.Home.name });
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.REGISTER]({ commit }, data) {
    myMmDbApi()
      .register(data)
      .then((result) => {
        commit(mutationTypes.FIRST, result);
        router.push({ path: routeInfo.Start.path, name: routeInfo.Start.name });
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
};
