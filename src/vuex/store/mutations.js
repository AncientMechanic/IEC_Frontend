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
  [mutationTypes.ADD_PARTICIPANT]: (state, data) => {
    state.participants.push(data);
  },
  [mutationTypes.UPDATE_PARTICIPANT]: (state, updatedParticipant) => {
    const index = state.participants.findIndex(participant => participant.id === updatedParticipant.id);
    if (index !== -1) {
      state.participants.splice(index, 1, updatedParticipant);
    }
  },
  [mutationTypes.ADD_EMPLOYER]: (state, employer) => {
    state.employers.push(employer);
  },
  [mutationTypes.UPDATE_EMPLOYER]: (state, updatedEmployer) => {
    const index = state.employers.findIndex(employer => employer.id === updatedEmployer.id);
    if (index !== -1) {
      state.employers.splice(index, 1, updatedEmployer);
    }
  },
  [mutationTypes.SET_CURRENT_USER]: (state, data) => {
    state.currentUser = data;
  },
  [mutationTypes.SET_CURRENT_PARTICIPANT]: (state, data) => {
    console.log('Before', state.currentParticipant);

    state.currentParticipant = data;

    console.log('After', state.currentParticipant);

  },
  [mutationTypes.SET_CURRENT_EMPLOYER]: (state, data) => {
    console.log('Before', state.currentEmployer);

    state.currentEmployer = data;

    console.log('After', state.currentEmployer);

  },
};
