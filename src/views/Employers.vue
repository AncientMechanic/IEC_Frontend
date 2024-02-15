<template>
  <div>
    <li v-for="(employer, index) in employers" :key="employer.id">
      {{ index + 1 }}. Работодатель: {{ employer.companyName }}, Позиция участника: {{ employer.position }}, Контактное лицо: {{ employer.contactFirstName }} {{ employer.contactLastName }}, Телефон: {{ employer.contactPhone }}, Электронная почта: {{ employer.contactEmail }}
      {{ employer.participantId }}
      <button @click="deleteEmployer(employer.id)">Удалить</button>
    </li>
  </div>
</template>
<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
export default {
  name: "EmployersView",
  computed: {
    employers() {
      console.log(1);
      const employers = this.$store.getters[mainGetterTypes.GET_EMPLOYERS];
      return employers;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_EMPLOYERS);
  },
  methods: {
    deleteEmployer: function (id) {
      this.$store.dispatch(mainActionTypes.DELETE_EMPLOYER, id);
    },
  },
};
</script>
