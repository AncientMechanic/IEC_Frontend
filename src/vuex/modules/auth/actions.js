import mainDbApi from "../../../api/mainDbApi";
import routeInfo from "../../../router/routeInfo";
import { mutations as mutationTypes, actions as actionTypes } from "./types";
import router from "../../../router";
import Cookies from 'js-cookie';

export default {
  [actionTypes.AUTH_REQUEST]({ commit }, data) {
    mainDbApi()
      .auth(data)
      .then((result) => {
        commit(mutationTypes.SET_AUTH_TOKEN, result.data.token);
        commit(mutationTypes.SET_USER_ID, result.data.userId);
        router.push({ path: routeInfo.Participants.path, name: routeInfo.Participants.name });
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.REGISTER]({ commit }, data) {
    mainDbApi()
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
