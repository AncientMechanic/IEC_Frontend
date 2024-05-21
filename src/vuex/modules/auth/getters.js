import { getters as getterTypes } from "./types";

export default {
  [getterTypes.GET_TOKEN]: (state) => {
    return state.token;
  },
  [getterTypes.GET_USER_ID]: (state) => {
    return state.userId;
  },
};
