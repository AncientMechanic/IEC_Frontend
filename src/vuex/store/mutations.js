import { mutations as mutationTypes } from "./types";
export default {
  [mutationTypes.SET_USERS]: (state, data) => {
    state.users = data;
  },
  [mutationTypes.SET_PARTICIPANTS]: (state, data) => {
    state.participants = data;
  },
  [mutationTypes.SET_EMPLOYERS]: (state, data) => {
    state.employers = data;
  },
  [mutationTypes.SET_CURRENT_USER]: (state, data) => {
    state.currentUser = data;
  },
};
