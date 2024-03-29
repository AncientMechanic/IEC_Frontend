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
  [actionTypes.FETCH_PARTICIPANTS]({ commit, state }) {
    mainDbApi(state.auth.token)
      .getAllParticipants()
      .then((result) => {
        commit(mutationTypes.SET_PARTICIPANTS, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.FETCH_EMPLOYERS]({ commit, state }) {
    mainDbApi(state.auth.token)
      .getAllEmployers()
      .then((result) => {
        commit(mutationTypes.SET_EMPLOYERS, result.data);
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
  [actionTypes.FETCH_CURRENT_PARTICIPANT]({ commit, state }, data) {
    mainDbApi(state.auth.token)
      .getCurrentParticipant(data)
      .then((result) => {
        commit(mutationTypes.SET_CURRENT_PARTICIPANT, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.FETCH_CURRENT_EMPLOYER]({ commit, state }, data) {
    mainDbApi(state.auth.token)
      .getCurrentEmployer(data)
      .then((result) => {
        commit(mutationTypes.SET_CURRENT_EMPLOYER, result.data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.DELETE_PARTICIPANT]({ dispatch, state }, data) {
    mainDbApi(state.auth.token)
      .deleteParticipant(data)
      .then(() => {
        dispatch(actionTypes.FETCH_PARTICIPANTS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.DELETE_EMPLOYER]({ dispatch, state }, data) {
    mainDbApi(state.auth.token)
      .deleteEmployer(data)
      .then(() => {
        dispatch(actionTypes.FETCH_EMPLOYERS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.CREATE_PARTICIPANT]({ dispatch, state }, participantData) {
    mainDbApi(state.auth.token)
      .postParticipant(participantData)
      .then(() => {
        dispatch(actionTypes.FETCH_PARTICIPANTS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.UPDATE_PARTICIPANT]({ dispatch, state }, participantData) {
    mainDbApi(state.auth.token)
      .putParticipant(participantData.id, participantData.data)
      .then(() => {
        dispatch(actionTypes.FETCH_PARTICIPANTS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.CREATE_EMPLOYER]({ dispatch, state }, employerData) {
    mainDbApi(state.auth.token)
      .postEmployer(employerData)
      .then(() => {
        dispatch(actionTypes.FETCH_EMPLOYERS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  },
  [actionTypes.UPDATE_EMPLOYER]({ dispatch, state }, employerData) {
    mainDbApi(state.auth.token)
      .putEmployer(employerData.id, employerData.data)
      .then(() => {
        dispatch(actionTypes.FETCH_EMPLOYERS);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        console.log("finally");
      });
  }
};
