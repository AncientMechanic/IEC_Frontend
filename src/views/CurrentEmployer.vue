<template>
  <div class="current-employer">
    <div class="employer-info-container">
      <div class="info-column">
        <h3>Offer information</h3>
        <div class="column-fields">
          <div class="field-row">
            <label for="companyName">Company name:</label>
            <input v-model="employer.companyName" id="companyName" type="text">
          </div>
          <div class="field-row">
            <label for="country">Country:</label>
            <input v-model="employer.country" id="country" type="text">
          </div>
          <div class="field-row">
            <label for="city">City:</label>
            <input v-model="employer.city" id="city" type="text">
          </div>
          <div class="field-row">
            <label for="companyAddress">Company address:</label>
            <textarea v-model="employer.companyAddress" id="companyAddress" type="text"></textarea>
          </div>
          <div class="field-row">
            <label for="position">Position:</label>
            <input v-model="employer.position" id="position" type="text">
          </div>
          <div class="field-row">
            <label for="housingProvided">Housing provided:</label>
            <input v-model="employer.housingProvided" id="housing" type="checkbox">
          </div>
          <div class="field-row">
            <label for="wage">Wage:</label>
            <input v-model="employer.wage" id="wage" type="text">
          </div>
        </div>
      </div>
      <div class="info-column">
        <h3>Contact information</h3>
        <div class="column-fields">
          <div class="field-row">
            <label for="contactFirstName">First name:</label>
            <input v-model="employer.contactFirstName" id="contactFirstName" type="text">
          </div>
          <div class="field-row">
            <label for="contactLastName">Last name:</label>
            <input v-model="employer.contactLastName" id="contactLastName" type="text">
          </div>
          <div class="field-row">
            <label for="contactEmail">E-mail:</label>
            <input v-model="employer.contactEmail" id="contactEmail" type="email">
          </div>
          <div class="field-row">
            <label for="contactPhone">Phone number:</label>
            <input v-model="employer.contactPhone" id="contactPhone" type="text">
          </div>
          <div class="field-row">
            <label for="jobOfferStatus">Status:</label>
            <select v-model="jobOfferStatus" id="jobOfferStatus">
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <button @click="updateEmployer">Save</button>
      <button @click="addEmployer" class="add-button">
        Add
        <img :src="addIcon" alt="Add Icon" class="add-icon">
      </button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <div class="column-header">
              <th>ID</th>
              <th>Company Name</th>
              <th>Job Offer Status</th>
            </div>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(employer, index) in filteredEmployers" :key="employer.id" class="row-container">
            <td class="part-id">{{ employer.id.slice(0, 5) }}</td>
            <td>{{ employer.companyName }}</td>
            <td>{{ employer.jobOfferStatus }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

  
  <script>
  import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";
  import addIcon from '../assets/Plus_dark.png';

  export default {
    name: "CurrentEmployerView",
    data() {
    return {
    shownEmployer: null,
    companyName: "",
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    country: "",
    city: "",
    companyAddress: "",
    wage: "",
    position: "",
    jobOfferStatus: "",
    housingProvided: false,
    componentLoaded: false,
    addIcon,
    };
  },
    computed: {
      employer() {
          const employers = this.filteredEmployers.filter(employer => employer.jobOfferStatus !== 'Declined');
          if (employers.length > 0) {
              return employers[0];
          } else {
              return {}; // Возвращаем пустой объект, если нет работодателей с другим статусом
          }
      },
      employers() {
        const employers = this.$store.getters[mainGetterTypes.GET_EMPLOYERS];
        return employers;
      },
      filteredEmployers() {
        return this.employers.filter(employer => employer.participantId === this.$route.params.id);
      },
    },
    watch: {
      "$route.params.id": function () {
        this.$store.dispatch(
          mainActionTypes.FETCH_CURRENT_EMPLOYER,
          this.$route.params.id
        );
      },
      employer: {
      handler: function (newVal) {
        this.jobOfferStatus = newVal.jobOfferStatus;
      },
      immediate: true // Обработка при инициализации
    }
    },
    beforeCreate() {
      this.$store.dispatch(
        mainActionTypes.FETCH_CURRENT_EMPLOYER,
        this.$route.params.id
      );
      this.$store.dispatch(mainActionTypes.FETCH_EMPLOYERS); // Получение списка всех работодателей
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.currentEmployer = {};
      next();
    },
    methods: {
    deleteParticipant(id) {
      this.$store.dispatch(mainActionTypes.DELETE_PARTICIPANT, id);
    },
    addEmployer() {
      let data = {
        participantId: this.$route.params.id,
        companyName: this.employer.companyName,
        contactFirstName: this.employer.contactFirstName,
        contactLastName: this.employer.contactLastName,
        contactEmail: this.employer.contactEmail,
        contactPhone: this.employer.contactPhone,
        country: this.employer.country,
        city: this.employer.city,
        companyAddress: this.employer.companyAddress,
        wage: this.employer.wage,
        position: this.employer.position,
        jobOfferStatus: this.jobOfferStatus,
        housingProvided: this.employer.housingProvided,
      };
      if(this.employer.id === undefined)
      {
      this.$store.dispatch(mainActionTypes.CREATE_EMPLOYER, data)
        .catch(error => {
          console.error("Error adding participant:", error);
          // Handle error as needed
        });
      }
      else{
        console.log("bububabab");
      }
    },
    updateEmployer(id) {
      id = this.employer.id;
      let data = {
        participantId: this.$route.params.id,
        companyName: this.employer.companyName,
        contactFirstName: this.employer.contactFirstName,
        contactLastName: this.employer.contactLastName,
        contactEmail: this.employer.contactEmail,
        contactPhone: this.employer.contactPhone,
        country: this.employer.country,
        city: this.employer.city,
        companyAddress: this.employer.companyAddress,
        wage: this.employer.wage,
        position: this.employer.position,
        jobOfferStatus: this.jobOfferStatus,
        housingProvided: this.employer.housingProvided,
      };
      this.$store.dispatch(mainActionTypes.UPDATE_EMPLOYER, {id, data})
      .catch(error => {
          console.error("Error updating participant:", error);
          // Handle error as needed
        });
    }
  }
  };
  </script>

<style scoped>
.current-employer {
  margin-top: -10px;
}

.current-employer h2 {
  margin-top: -20px;
  margin-bottom: 20px;
  font-size: 27px;
  font-weight: 550;
  color: #354770;
  text-decoration: none;
}

.employer-info-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px; /* Расстояние между колонками */
  margin-bottom: 20px;
}

.info-column {
  width: 100%;
  background-color: #f6f8fa;
}

.info-column h3 {
  font-size: 20px;
  color: #6196F5;
  font-weight: 500;
  margin-bottom: 20px;
}

.column-fields {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 10px;
  margin-left: 30px;
}

.field-row {
  display: contents;
}

.field-row label {
  flex: 0 0 150px;
  margin-right: 10px;
  white-space: nowrap;
  color: #797979;
  font-weight: 450;
}

.field-row input,
.field-row select {
  flex: 1;
  max-width: 315px;
  height: 30px;
  border: 1px solid #797979;
  background-color: #f6f8fa;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  color: #354770;
  font-weight: 450;
}

.field-row textarea {
  flex: 1;
  max-width: 315px;
  border: 1px solid #797979;
  background-color: #F6F8FA;
  border-radius: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;
  color: #354770;
  font-weight: 450;
}

.field-row input:hover,
.field-row select:hover, 
.field-row textarea:hover{
  border: 1px solid #6196f5;
}

.field-row input:focus,
.field-row select:focus,
.field-row textarea:focus {
  outline: none;
  border: 2px solid #6196f5;
}

.field-row input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #354770;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  margin-right: 100px;
  cursor: pointer;
}

.field-row input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 13px;
  background-color: #354770;
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.1s ease;
}

.field-row input[type="checkbox"]:checked::before {
  opacity: 1;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.button-container button {
  margin-left: 20px;
  padding: 4px 40px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.button-container button:first-child,
.button-container button:last-child {
  background-color: #F6F8FA;
  color: #354770;
  border: 2px solid #354770;
  transition: background-color 0.2s ease;
  font-size: 18px;
}

.add-button {
  width: 130px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  width: 20px;
  height: 20px;
  margin-left: 15px;
}

.button-container button:first-child:hover,
.button-container button:last-child:hover {
  background-color: #6196F5;
  color: #F6F8FA;
  border: 2px solid #6196F5;
  font-size: 18px;
}

.add-button:hover .add-icon{
  content: url('../assets/Plus.png');
}

.table-container {
  background-color: #DBE0EB;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.column-header {
  display: grid;
  grid-template-columns: 10% 20% 80%; /* Ширина столбцов */
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  height: 50px;
}

.column-header th {
  text-align: left;
  font-weight: 650;
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 19px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-container {
  display: grid;
  grid-template-columns: 10% 20% 80%; /* Ширина столбцов */
  align-items: center;
  background-color: #F6F8FA;
  border-radius: 10px;
  padding: 10px;
  height: 50px;
  margin-bottom: 10px;
}

.row-container td {
  text-align: left;
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.part-id {
  font-weight: 550;
}
</style>
  