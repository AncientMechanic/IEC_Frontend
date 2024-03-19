import { getters as getterTypes } from "./types";
export default {
  [getterTypes.GET_USERS]: (state) => {
    return state.users;
  },
  [getterTypes.GET_PARTICIPANTS]: (state) => {
    return state.participants;
  },
  [getterTypes.GET_EMPLOYERS]: (state) => {
    return state.employers;
  },
  [getterTypes.GET_CURRENT_USER]: (state) => {
    return state.currentUser;
  },
  [getterTypes.GET_CURRENT_PARTICIPANT]: (state) => {
    return state.currentParicipant;
  },
  [getterTypes.GET_CURRENT_EMPLOYER]: (state) => {
    return state.currentEmployer;
  },
};
