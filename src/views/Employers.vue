<template>
  <div class="employers-container font-Montserrat">
    <div class="search-container">
      <img src="src\assets\Search.png" alt="Search Icon" class="search-icon">
      <input type="text" v-model="searchQuery" placeholder="Search for an employer" class="search-input">
    </div>
    <div class="header-container">
      <h1 class="page-title">Job offers</h1>
      <div class="button-container">
        <button @click="exportToXLSX" class="icon-btn-dnld">
          <span>Download</span>
          <img src="src\assets\Download.png" alt="Export Icon" class="icon">
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <div class="column-header">
            <th>ID</th>
            <th>Company name</th>
            <th>Country</th>
            <th>City</th>
            <th>Contact person</th>
            <th>E-mail</th>
            <th>Position</th>
            <th>Housing</th>
            <th>Wage</th>
            <th></th>
          </div>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(employer, index) in findEmployers" :key="employer.id">
          <div class="row-container">
            <td class="part-id">{{ employer.id.slice(0, 8) }}</td>
            <td>{{ employer.companyName }}</td>
            <td>{{ employer.country }}</td>
            <td>{{ employer.city }}</td>
            <td>{{ employer.contactFirstName }} {{ employer.contactLastName }}</td>
            <td>{{ employer.contactEmail }}</td>
            <td>{{ employer.position }}</td>
            <td>{{ employer.housingProvided ? 'Provided' : 'Not provided' }}</td>
            <td>{{ employer.wage }}</td>
            <td class="open-btn-cell">
              <button class="delete-btn" @click="confirmDeleteEmployer(employer.id)">Delete</button>
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
import * as XLSX from 'xlsx';

export default {
  name: "EmployersView",
  data() {
    return {
      searchQuery: "",
      currentPage: 1, // Текущая страница
      perPage: 5, // Количество строк на странице (по умолчанию 5)
      pageOptions: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], // Варианты количества строк на странице
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
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return employersToDisplay.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.findEmployers.length / this.perPage);
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
      const maxVisiblePages = 5;

      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      if (startPage <= maxVisiblePages - 2) {
        startPage = 1;
        endPage = Math.min(this.totalPages, maxVisiblePages);
      }

      if (endPage >= this.totalPages - maxVisiblePages + 3) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePageNumbers.push(i);
      }

      if (startPage > 1) {
        visiblePageNumbers.unshift('...');
        visiblePageNumbers.unshift(1);
      }

      if (endPage < this.totalPages) {
        visiblePageNumbers.push('...');
        visiblePageNumbers.push(this.totalPages);
      }

      return visiblePageNumbers;
    },
  },
  watch: {
    searchQuery() {
      this.currentPage = 1; // Сброс текущей страницы при изменении поискового запроса
    },
    perPage() {
      this.currentPage = 1; // Сброс текущей страницы при изменении количества строк на странице
    },
  },
  beforeCreate() {
    this.$store.dispatch(mainActionTypes.FETCH_EMPLOYERS);
  },
  methods: {
    exportToXLSX() {
      const data = this.employers.map(employer => ({
        "ID": employer.id,
        "Компания": employer.companyName,
        "Страна": employer.country,
        "Город": employer.city,
        "Контакт": employer.contactFirstName + " " + employer.contactLastName,
        "Почта": employer.contactEmail,
        "Позиция": employer.position,
        "Жилье предоставлено": employer.housingProvided,
        "Ставка": employer.wage,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();

      const columnWidths = [10, 30, 20, 20, 30, 30, 20, 30, 20];
      worksheet["!cols"] = columnWidths.map(width => ({ wch: width }));

      XLSX.utils.book_append_sheet(workbook, worksheet, "Работодатели");
      XLSX.writeFile(workbook, "Работодатели.xlsx");
    },
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

<style scoped>
.employers-container {
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  padding: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  display: grid;
  grid-template-columns: 8% 13% 10% 7% 13% 15% 10% 8% 10% 6%; /* Ширина столбцов */
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
  display: grid;
  grid-template-columns: 8% 13% 10% 7% 13% 15% 10% 8% 10% 6%; /* Ширина столбцов */
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
  font-weight: 550;
}

.delete-btn {
  background-color: #F6F8FA;
  color: #FF4343;
  border: none;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 2px solid #FF4343;
  width: 100px;
  height: 40px;
  font-weight: 500;
}

.delete-btn:hover {
  background-color: #FF4343;
  color: #F6F8FA;
}

.open-btn-cell {
  display: flex;
  justify-content: flex-end;
  margin-right: -12px;
}

/* Стили для кнопок и иконок */
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

.icon-btn-dnld:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
}
.icon-btn-dnld:hover .icon {
  content: url('../assets/Download_white.png');
}

.icon-btn-dnld .icon {
  width: 24px;
  height: 24px;
  margin-left: 20px;
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