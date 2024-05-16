<template>
  <div class="query-page font-Montserrat">
    <div class="container-row">
      <div class="filters-container">
        <h2>Filters</h2>
        <ul>
          <li v-for="(condition, key) in conditions" :key="key" class="filter-item">
            <label :for="key" class="condition-label">
              <span class="bullet"></span>
              {{ condition }}
            </label>
            <input type="checkbox" :id="key" v-model="selectedConditions[key]" class="checkbox" />
          </li>
          <li class="filter-item">
            <label for="servicePlan" class="condition-label">
              <span class="bullet"></span>
              Service Plan:
            </label>
            <select v-model="selectedServicePlan" id="servicePlan" class="dropdown">
              <option value="FullService">Full Service</option>
              <option value="SelfArranged">Self Arranged</option>
              <option value="">None</option>
            </select>
          </li>
          <li class="filter-item">
            <label for="program" class="condition-label">
              <span class="bullet"></span>
              Program:
            </label>
            <select v-model="selectedProgram" id="program" class="dropdown">
              <option value="Work&TravelUSA">Work&Travel USA</option>
              <option value="Australia">Australia</option>
              <option value="Vietnam">Vietnam</option>
              <option value="">None</option>
            </select>
          </li>
        </ul>
      </div>
      <div class="query-container">
        <h2>Query</h2>
        <textarea :value="getQuery" readonly class="query-textarea"></textarea>
      </div>
    </div>
    <div class="filter-and-buttons">
      <div class="filter-type-container">
        <label for="filterType">Condition:</label>
        <select v-model="filterType" id="filterType" class="condition-selector">
          <option value="isOn">is on</option>
          <option value="isNotOn">is not on</option>
        </select>
      </div>
      <div class="button-container">
        <router-link :to="{ name: 'Participants' }" class="cancel-btn">
          <span>Cancel</span>
          <img src="src\assets\Cancel.png" alt="Cancel Icon" class="cancel-icon" />
        </router-link>
        <button @click="applyFilters" class="apply-btn">Apply</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  actions as mainActionTypes,
  getters as mainGetterTypes,
} from "../vuex/store/types";

export default {
  name: "Query",
  data() {
    return {
      conditions: {
        contractSigned: 'Contract Signed',
        hasEmployer: 'Job offer signed',
        missingDocuments: 'Missing Documents',
        prePaymentComplete: 'Pre-payment complete',
        paymentComplete: 'Payment complete',
        visaApproved: 'Visa approved',
        // Добавьте другие условия по мере необходимости
      },
      selectedConditions: {
      },
      selectedServicePlan: null,
      selectedProgram: null,
      filterType: "isOn" // Устанавливаем значение по умолчанию для фильтрации
    };
  },
  computed: {
    getQuery() {
      let query = '';
      for (let key in this.selectedConditions) {
        if (this.selectedConditions[key]) {
          query += `${this.conditions[key]} & \n`;
        }
      }
      if (this.selectedServicePlan) {
        query += `Service Plan: ${this.selectedServicePlan} & \n`;
      }
      if (this.selectedProgram) {
        query += `Program: ${this.selectedProgram} & \n`;
      }
      return query.slice(0, -3);
    }
  },
  methods: {
    applyFilters() {
      let filteredParticipants = [];
      if (this.filterType === "isOn") {
        filteredParticipants = this.filterParticipants();
      } else if (this.filterType === "isNotOn") {
        filteredParticipants = this.getAllParticipants().filter(participant => !this.filterParticipants().includes(participant));
      }
      this.$router.push({ name: 'Participants', query: { filteredParticipants: JSON.stringify(filteredParticipants) } });
    },
    filterParticipants() {
      const allParticipants = this.$store.getters[mainGetterTypes.GET_PARTICIPANTS];
      // Применяем фильтрацию на основе выбранных условий
      return allParticipants.filter(participant => {
        // Проверяем каждое выбранное условие
        for (let condition in this.selectedConditions) {
          // Если условие выбрано и не соответствует участнику, прерываем цикл и возвращаем false
          if (this.selectedConditions[condition] && !participant[condition]) {
            return false;
          }
        }
        if (this.selectedServicePlan && participant.servicePlan !== this.selectedServicePlan) {
          return false;
        }
        if (this.selectedProgram && participant.program !== this.selectedProgram) {
          return false;
        }
        // Если все условия соответствуют, возвращаем true для текущего участника
        return true;
      });
    },
    getAllParticipants() {
      return this.$store.getters[mainGetterTypes.GET_PARTICIPANTS];
    }
  }
};
</script>

<style>
.query-page {
  margin: 20px;
}

.container-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filters-container {
  width: 100%;
  max-width: 30%;
  height: 550px;
  padding: 20px;
  background-color: #F6F8FA;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px rgba(96, 96, 96, 0.35);
}

.filters-container h2 {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 27px;
  font-weight: 550;
  margin-bottom: 15px;
  margin-left: 7px;
}

.filters-container ul {
  list-style-type: none;
  padding: 0;
}

.filters-container li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bullet {
  width: 8px;
  height: 8px;
  background-color: #354770;
  border-radius: 50%;
  margin-right: 15px;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
  width: 100%;
}

.condition-label {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #354770;
  width: calc(100% - 220px); /* Adjust this value according to the width of the dropdown/checkbox */
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.checkbox {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #354770;
  background-color: #ffffff;
  border-radius: 4px;
  position: relative;
  margin-left: 10px;
  margin-right: 100px;
  cursor: pointer;
}

.checkbox::before {
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

.checkbox:checked::before {
  opacity: 1;
}

.dropdown {
  width: 180px;
  height: 26px;
  border: #354770 solid 2px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #354770;
  margin-right: 20px;
}

.dropdown:hover {
  border: #6196F5 solid 2px;
}

select {
  background-color: #F6F8FA;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

select option {
  background-color: #F6F8FA;
  color: #354770;
  border-radius: 12px;
  padding: 8px 12px;
}

.dropdown:focus, .query-textarea:focus, .condition-selector:focus{
  outline: none; /* Убирает стандартный outline */
}

.query-container {
  width: 100%;
  max-width: 68%;
  padding: 20px;
  background-color: #F6F8FA;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px rgba(96, 96, 96, 0.35);
}

.query-container h2 {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 27px;
  font-weight: 550;
  margin-bottom: 15px;
  margin-left: 7px;
}

.query-textarea {
  width: 100%;
  height: 400px;
  resize: none;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #F6F8FA;
  background-color: #F6F8FA;
  border-radius: 4px;
  font-family: Montserrat;
  font-size: 18px;
  color: #354770;
  cursor: auto;
}

.filter-and-buttons {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-end;
}

.filter-type-container {
  margin-right: 50px;
  font-size: 18px;
  font-weight: 500;
}

.condition-selector {
  margin-left: 20px;
  font-weight: normal;
  width: 180px;
  height: 26px;
  border: #354770 solid 2px;
  border-radius: 5px;
  color: #354770;
  background-color: #ffffff;
}

.condition-selector:hover {
  border: #6196F5 solid 2px;
}

.button-container {
  display: flex;
  align-items: center;
}

.cancel-btn {
  width: 130px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #DBE0EB;
  color: #FF4343;
  border: 2px solid #FF4343;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
  margin-right: 30px;
}

.cancel-btn:hover {
  background-color: #FF4343;
  color: #F6F8FA;
  border: 2px solid #FF4343;
}

.cancel-btn:hover .icon {
  content: url('../assets/Cancel_white.png');
}

.cancel-icon {
  width: 19px;
  height: 19px;
  margin-right: 10px;
  margin-left: 10px;
}

.cancel-btn:hover .cancel-icon{
  content: url('../assets/Cancel_white.png');
}

.apply-btn {
  width: 150px;
  height: 47px;
  display: flex;
  align-items: center;
  background-color: #6196F5;
  color: #F6F8FA;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

.apply-btn:hover {
  background-color: #3773e2;
  color: #F6F8FA;
}
</style>
