/**
  * Renders a table to display a list of participants.
  * Allows searching participants by last name using a search input.
  * Displays key details about each participant in a table.
  * Provides links to view, edit and delete each participant.
  * Includes a link to add a new participant.
  */
<template>
  <div>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Введите фамилию">
    </div>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Отчество</th>
          <th>Дата рождения</th>
          <th>Сезон</th>
          <th>Программа</th>
          <th>Перейти</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in findParticipants" :key="participant.id">
          <td>{{ index + 1 }}</td>
          <td>{{ participant.lastName }}</td>
          <td>{{ participant.firstName }}</td>
          <td>{{ participant.patronymic }}</td>
          <td>{{ formatDate(participant.dateOfBirth) }}</td>
          <td>{{ participant.season }}</td>
          <td>{{ participant.program }}</td>
          <td>
            <router-link :to="{ name: 'CurrentParticipant', params: { id: participant.id } }">
              Перейти
            </router-link>
            <button @click="confirmDeleteParticipant(participant.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="exportToXLSX">Экспорт в XLSX</button>
    </div>
    <router-link :to="{ name: 'CurrentParticipant', params: { id: 'null' } }">
      Добавить участника
    </router-link>
    <div>
      <router-link :to="{ name: 'Query' }">
        Запрос
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';

export default {
  name: "ParticipantsView",
  data() {
    return {
      userId: Cookies.get('userId') || "", // Получаем userId из cookies
      searchQuery: "",
    };
  },
  computed: {
    displayedParticipants() {
    const filteredParticipants = this.$route.query.filteredParticipants;
    return filteredParticipants ? JSON.parse(filteredParticipants) : this.participants;
    },
    participants() {
      const sortedParticipants = this.$store.getters[mainGetterTypes.GET_PARTICIPANTS].sort((a, b) => a.lastName.localeCompare(b.lastName));
      return this.$route.params.filteredParticipants || sortedParticipants;
    },
    findParticipants() {
      const query = this.searchQuery.trim().toLowerCase();
      let participantsToDisplay = this.displayedParticipants;

      // Если есть запрос, фильтруем участников
      if (query) {
      participantsToDisplay = participantsToDisplay.filter(participant =>
      participant.lastName.toLowerCase().startsWith(query));
      }
      // Сортируем участников по фамилии
      participantsToDisplay.sort((a, b) => a.lastName.localeCompare(b.lastName));
      return participantsToDisplay;
    },
    user() {
      return Cookies.get('userId');
    }
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_PARTICIPANTS);
  },
  methods: {
    exportToXLSX() {
      const data = this.participants.map(participant => ({
        "Фамилия": participant.lastName,
        "Имя": participant.firstName,
        "Отчество": participant.patronymic,
        "Дата рождения": this.formatDate(participant.dateOfBirth),
        "Сезон": participant.season,
        "Программа": participant.program
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Участники");
      XLSX.writeFile(workbook, "участники.xlsx");
    },
    confirmDeleteParticipant(id) {
    if (confirm("Вы уверены, что хотите удалить этого участника?")) {
      this.deleteParticipant(id);
    } else {
      console.log("Удаление отменено");
    }
  },
    deleteParticipant(id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id);
    },
    formatDate(dateString) {
     if (!dateString) return null;
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
  }
};
</script>
