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
        <tr v-for="(participant, index) in paginatedParticipants" :key="participant.id">
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
    <div class="pagination-controls">
      <div class="pagination-container">
        <div class="pagination">
          <div class="pagination-button-prev">
            <button :disabled="currentPage === 1" @click="currentPage--">
              <img
                :src="currentPage === 1 ? prevDisabledIcon : prevIcon"
                alt="Previous"
                class="pagination-icon"
              />
              <span>Prev</span>
            </button>
          </div>
          <div class="page-numbers">
          <span v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
            <button
              v-if="typeof pageNumber === 'number'"
              :class="{ active: currentPage === pageNumber }"
              @click="currentPage = pageNumber"
            >
              {{ pageNumber }}
            </button>
            <span v-else class="ellipsis">{{ pageNumber }}</span>
          </span>
          </div>
          <div class="pagination-button-next">
            <button :disabled="currentPage === totalPages" @click="currentPage++">
              <span>Next</span>
              <img
                :src="currentPage === totalPages ? nextDisabledIcon : nextIcon"
                alt="Next"
                class="pagination-icon"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="page-size-select">
        <label for="page-size">Show:</label>
        <select id="page-size" v-model="perPage" class="size-selector">
          <option v-for="option in pageOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
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
      currentPage: 1, // Текущая страница
      perPage: 5, // Количество строк на странице (по умолчанию 5)
      pageOptions: [1, 2, 5], // Варианты количества строк на странице
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
    },
    paginatedParticipants() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.findParticipants.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.findParticipants.length / this.perPage);
    },
    pageNumbers() {
      const pageNumbers = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    },
    visiblePageNumbers() {
      const visiblePageNumbers = [];
      const maxVisiblePages = 5; // Максимальное количество видимых номеров страниц

      // Определяем начальную и конечную страницы для отображения
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      // Если начальная страница слишком близко к первой странице
      if (startPage <= maxVisiblePages - 2) {
        startPage = 1;
        endPage = Math.min(this.totalPages, maxVisiblePages);
      }

      // Если конечная страница слишком близко к последней странице
      if (endPage >= this.totalPages - maxVisiblePages + 3) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Добавляем номера страниц в диапазоне от начальной до конечной страницы
      for (let i = startPage; i <= endPage; i++) {
        visiblePageNumbers.push(i);
      }

      // Если есть предыдущие страницы, добавляем три точки и номер первой страницы
      if (startPage > 1) {
        visiblePageNumbers.unshift('...');
        visiblePageNumbers.unshift(1);
      }

      // Если есть следующие страницы, добавляем три точки и номер последней страницы
      if (endPage < this.totalPages) {
        visiblePageNumbers.push('...');
        visiblePageNumbers.push(this.totalPages);
      }

      return visiblePageNumbers;
    },
  },
  watch: {
    perPage() {
      this.currentPage = 1; // Сбросить текущую страницу на первую при изменении количества строк
    },
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
  table-layout: fixed; /* Фиксированная ширина столбцов */
}

th, td {
  padding: 10px;
  text-align: left;
  white-space: nowrap; /* Запрещает перенос текста на новую строку */
  overflow: hidden; /* Скрывает выходящий за пределы текст */
  text-overflow: ellipsis; /* Добавляет многоточие для обрезанного текста */
}

th:nth-child(1) { width: 10%; } /* Ширина первого столбца (ID) */
th:nth-child(2) { width: 20%; } /* Ширина второго столбца (Last name) */
th:nth-child(3) { width: 15%; } /* Ширина третьего столбца (First Name) */
th:nth-child(4) { width: 15%; } /* Ширина четвертого столбца (Patronymic) */
th:nth-child(5) { width: 15%; } /* Ширина пятого столбца (Date of birth) */
th:nth-child(6) { width: 10%; } /* Ширина шестого столбца (Season) */
th:nth-child(7) { width: 10%; } /* Ширина седьмого столбца (Program) */
th:nth-child(8) { width: 5%; } /* Ширина восьмого столбца (Кнопка) */

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
  margin-top: 20px;
  margin-bottom: 10px;
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

.pagination-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.page-size-select {
  display: flex;
  align-items: center;
}

.size-selector {
  width: 60px;
  height: 30px;
  background-color: #DBE0EB;
  border: 2px solid #6196F5;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #6196F5;
  padding-left: 5px;
}


.page-size-select label {
  margin-right: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #6196F5;
}

.pagination-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 80px;
}

.pagination {
  display: flex;
  align-items: center;
}

.page-numbers button {
  width: 34px;
  height: 34px;
  font-size: 18px;
  font-weight: 500;
  color: #6196F5;
  margin-right: 10px;
  border-radius: 8px;
}

.page-numbers button:hover {
  background-color: #BCCFF5;
}

.page-numbers button.active {
  background-color: #6196f5;
  color: #fff;
}

.pagination-button-prev .pagination-icon{
  width: 15px;
  height: 20px;
  margin-right: 15px;
  content: url('../assets/Previous.png');
}

.pagination-button-next .pagination-icon{
  width: 15px;
  height: 20px;
  margin-left: 15px;
  content: url('../assets/Next.png');
}

.ellipsis {
  color: #6196f5;
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
  line-height: 1; /* Adjusted line-height */
  vertical-align: middle; /* Ensures vertical alignment */
  display: inline-flex; /* Makes alignment easier */
  align-items: center; /* Centers content vertically */
  margin-top: -3px; /* Adjusted margin-top to lower the position */
}

.pagination-button-prev,
.pagination-button-next {
  display: flex;
  align-items: center;
}

.pagination-button-prev {
  margin-right: 25px;
}
.pagination-button-next {
  margin-left: 15px;
}

.pagination-button-prev button,
.pagination-button-next button {
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #6196f5;
  border: none;
  padding: 5px 0px;
  cursor: pointer;
  font-size: 19px;
  font-weight: 450;
  transition: background-color 0.3s ease;
}

.pagination-button-prev button:hover,
.pagination-button-next button:hover {
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #2f74f6;
  border: none;
  padding: 4px 0px;
  cursor: pointer;
  font-size: 19px;
  transition: background-color 0.3s ease;
}

.pagination-button-prev button:disabled,
.pagination-button-next button:disabled {
  background-color: #DBE0EB;
  color: #969696;
  border: none;
}

.pagination-button-prev button:disabled .pagination-icon,
.pagination-button-next button:disabled .pagination-icon {
  filter: grayscale(100%);
}

.pagination-button-prev span,
.pagination-button-next span {
  margin-left: 8px;
  margin-right: 8px;
}
</style>