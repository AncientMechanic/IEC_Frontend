<template>
  <div>
    <li v-for="(participant, index) in participants" :key="participant.id">
      {{ index + 1 }}. Участник: {{ participant.lastName }} {{ participant.firstName }} {{ participant.patronymic }}, ВУЗ: {{ participant.nameOfUniversity }}, Телефон: {{ participant.phoneNumber }}, Электронная почта: {{ participant.email }}

      <button @click="deleteParticipant(participant.id)">Удалить</button>
    </li>
  </div>
</template>
<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
export default {
  name: "ParticipantsView",
  computed: {
    participants() {
      console.log(1);
      const participants = this.$store.getters[mainGetterTypes.GET_PARTICIPANTS];
      return participants;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_PARTICIPANTS);
  },
  methods: {
    deleteParticipant: function (id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id);
    },
  },
};
</script>
