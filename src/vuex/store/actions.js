import mainDbApi from "../../api/mainDbApi.js";
import { actions as actionTypes, mutations as mutationTypes } from "./types.js";

export default {
  [actionTypes.FETCH_USERS]({ commit, state }) {
    mainDbApi(state.auth.token)
      .getAllUsers()
      .then((result) => {
        commit(mutationTypes.SET_USERS, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.FETCH_LISTS]({ commit, state }) {
    mainDbApi(state.auth.token)
      .getAllLists()
      .then((result) => {
        commit(mutationTypes.SET_LISTS, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.FETCH_TASKS]({ commit, state }) {
    mainDbApi(state.auth.token)
      .getAllTasks()
      .then((result) => {
        commit(mutationTypes.SET_TASKS, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.FETCH_CURRENT_USER]({ commit, state }, data) {
    mainDbApi(state.auth.token)
      .getCurrentUser(data)
      .then((result) => {
        commit(mutationTypes.SET_CURRENT_USER, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.DELETE_LIST]({ dispatch, state }, data) {
    mainDbApi(state.auth.token)
      .deleteList(data)
      .then(() => {
        dispatch(actionTypes.FETCH_LISTS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.DELETE_TASK]({ dispatch, state }, data) {
    mainDbApi(state.auth.token)
      .deleteTask(data)
      .then(() => {
        dispatch(actionTypes.FETCH_TASKS);
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
