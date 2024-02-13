import { mutations as mutationTypes } from "./types";
export default {
  [mutationTypes.SET_USERS]: (state, data) => {
    state.users = data;
  },
  [mutationTypes.SET_LISTS]: (state, data) => {
    state.lists = data;
  },
  [mutationTypes.SET_TASKS]: (state, data) => {
    state.tasks = data;
  },
  [mutationTypes.SET_CURRENT_USER]: (state, data) => {
    state.currentUser = data;
  },
};
