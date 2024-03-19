<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Введите имя компании">
  </div>
  <div>
    <li v-for="(employer, index) in findEmployers" :key="employer.id">
      {{ index + 1 }}. Работодатель: {{ employer.companyName }}, Позиция участника: {{ employer.position }}, Контактное лицо: {{ employer.contactFirstName }} {{ employer.contactLastName }}, Телефон: {{ employer.contactPhone }}, Электронная почта: {{ employer.contactEmail }}
      <button @click="confirmDeleteEmployer(employer.id)">Удалить</button>
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
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    employers() {
      console.log(1);
      const employers = this.$store.getters[mainGetterTypes.GET_EMPLOYERS];
      return employers;
    },
    findEmployers() {
      const query = this.searchQuery.trim().toLowerCase();
      let employersToDisplay = this.employers;

      // Если есть запрос, фильтруем участников
      if (query) {
        employersToDisplay = employersToDisplay.filter(employer =>
        employer.companyName.toLowerCase().startsWith(query));
      }
      // Сортируем участников по фамилии
      employersToDisplay.sort((a, b) => a.companyName.localeCompare(b.companyName));
      return employersToDisplay;
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_EMPLOYERS);
  },
  methods: {
    confirmDeleteEmployer(id) {
    if (confirm("Вы уверены, что хотите удалить этого работодателя?")) {
      this.deleteEmployer(id);
    } else {
      console.log("Удаление отменено");
    }
  },
    deleteEmployer: function (id) {
      this.$store.dispatch(mainActionTypes.DELETE_EMPLOYER, id);
    },
  },
};
</script>
