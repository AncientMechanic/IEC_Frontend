import { getters as getterTypes } from "./types";
export default {
  [getterTypes.GET_USERS]: (state) => {
    return state.users;
  },
  [getterTypes.GET_LISTS]: (state) => {
    return state.lists;
  },
  [getterTypes.GET_TASKS]: (state) => {
    return state.tasks;
  },
  [getterTypes.GET_CURRENT_USER]: (state) => {
    return state.currentUser;
  },
};
