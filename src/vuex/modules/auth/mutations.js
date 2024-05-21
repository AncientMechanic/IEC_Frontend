import { mutations as mutationTypes } from "./types";

export default {
  [mutationTypes.SET_AUTH_TOKEN](state, token) {
    state.token = token;
  },
  [mutationTypes.FIRST](state, data) {
    console.log(data);
  },
  [mutationTypes.SET_USER_ID](state, userId) {
    state.userId = userId;
  },
};
