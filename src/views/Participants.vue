/**
  * Renders a table to display a list of participants.
  * Allows searching participants by last name using a search input.
  * Displays key details about each participant in a table.
  * Provides links to view, edit and delete each participant.
  * Includes a link to add a new participant.
  */
<template>
  <div class="participants-container font-Montserrat">
    <div class="search-container">
      <img src="src\assets\Search.png" alt="Search Icon" class="search-icon">
      <input type="text" v-model="searchQuery" placeholder="Search for a participant" class="search-input">
    </div>
    <div class="header-container">
      <h1 class="page-title">Participants</h1>
      <div class="button-container">
        <button @click="exportToXLSX" class="icon-btn-dnld">
          <span>Download</span>
          <img src="src\assets\Download.png" alt="Export Icon" class="icon">
        </button>
        <router-link :to="{ name: 'Query' }" class="icon-btn-filt">
          <span>Filter</span>
          <img src="src\assets\Filter.png" alt="Query Icon" class="icon">
        </router-link>
        <router-link :to="{ name: 'CurrentParticipant', params: { id: 'null' } }" class="icon-btn-add">
          <span>Add participant</span>
          <img src="src\assets\Plus_dark.png" alt="Add Icon" class="icon">
        </router-link>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <div class="column-header">
            <th>ID</th>
            <th>Last name</th>
            <th>First Name</th>
            <th>Patronymic</th>
            <th>Date of birth</th>
            <th>Season</th>
            <th>Program</th>
            <th></th>
          </div>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(participant, index) in findParticipants" :key="participant.id">
          <div class="row-container">
            <td class="part-id">{{ participant.id.slice(0, 8) }}</td>
            <td>{{ participant.lastName }}</td>
            <td>{{ participant.firstName }}</td>
            <td>{{ participant.patronymic }}</td>
            <td>{{ formatDate(participant.dateOfBirth) }}</td>
            <td>{{ participant.season }}</td>
            <td>{{ participant.program }}</td>
            <td>
              <button class="open-btn" @click="openParticipant(participant.id)">Open</button>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
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
    },
    openParticipant(id) {
      this.$router.push({ name: 'CurrentParticipant', params: { id } });
    }
  }
};
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  max-width: 659px;
  max-height: 46px;
  box-shadow: 0 0px 7px rgba(0, 0, 0, 0.1);
}

.search-icon {
  width: 23px;
  height: 22px;
  margin-right: 20px;
  margin-left: 10px;
}

.search-input {
  font-family: Montserrat;
  font-size: 15%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
}

.page-title {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 31px;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 15px;
}

.column-header {
  display: flex;
  align-items: center;
  background-color: #F6F8FA;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 30px;
  height: 50px;
}

.column-header th {
  flex: 1;
  text-align: left;
  font-weight: 650;
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 19px;
}

.row-container {
  display: flex;
  align-items: center;
  background-color: #F6F8FA;
  border-radius: 10px;
  padding: 10px;
  height: 50px;
  margin-bottom: 10px;
}

.row-container td {
  flex: 1;
  text-align: left;
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
}

.part-id {
  font-weight: 550; /* Полужирный */
}

.open-btn {
  background-color: #F6F8FA;
  color: #6196f5;
  border: none;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid #6196f5;
  width: 100px;
  height: 40px;
  font-weight: 500;
}

.open-btn:hover {
  background-color: #6196f5;
  color: #F6F8FA;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  gap: 10px;
}

.icon-btn-dnld {
  width: 192px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #354770;
  border: 2px solid #354770;
  padding: 8px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.icon-btn-filt {
  width: 140px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #354770;
  border: 2px solid #354770;
  padding: 8px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  margin-left: 20px;
}

.icon-btn-add {
  width: 256px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #354770;
  border: 2px solid #354770;
  padding: 8px 28px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  margin-left: 20px;
}

.icon-btn-add:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  background-image: url('../assets/Plus_light.png'); /* Путь к картинке при наведении */
}
.icon-btn-add:hover .icon {
  content: url('../assets/Plus.png');
}

.icon-btn-filt:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  background-image: url('../assets/Plus_light.png'); /* Путь к картинке при наведении */
}
.icon-btn-filt:hover .icon {
  content: url('../assets/Filter_white.png');
}

.icon-btn-dnld:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  background-image: url('../assets/Plus_light.png'); /* Путь к картинке при наведении */
}
.icon-btn-dnld:hover .icon {
  content: url('../assets/Download_white.png');
}

.icon-btn-add .icon {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  content: url('../assets/Plus_dark.png');
}

.icon-btn-filt .icon {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  content: url('../assets/Filter.png');
}

.icon-btn-dnld .icon {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  content: url('../assets/Download.png');
}



</style>