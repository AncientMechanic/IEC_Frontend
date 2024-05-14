<template>
  <div class="query-page font-Montserrat">
    <div class="container-row">
      <div class="filters-container">
        <h2>Filters</h2>
        <ul>
          <li v-for="(condition, key) in conditions" :key="key" class="filter-item">
            <span class="bullet"></span>
            <span class="condition-label">{{ condition }}</span>
            <input type="checkbox" :id="key" v-model="selectedConditions[key]" class="checkbox" />
          </li>
          <li class="filter-item">
            <span class="bullet"></span>
            <span class="condition-label">Service Plan:</span>
            <div class="dropdown-container">
              <select v-model="selectedServicePlan" id="servicePlan" class="dropdown">
                <option value="FullService">Full Service</option>
                <option value="SelfArranged">Self Arranged</option>
                <option value="">None</option>
              </select>
            </div>
          </li>
          <li class="filter-item">
            <span class="bullet"></span>
            <span class="condition-label">Program:</span>
            <div class="dropdown-container">
              <select v-model="selectedProgram" id="program" class="dropdown">
                <option value="Work&TravelUSA">Work&Travel USA</option>
                <option value="Australia">Australia</option>
                <option value="Vietnam">Vietnam</option>
                <option value="">None</option>
              </select>
            </div>
          </li>
      </ul>
      </div>
      <div class="query-container">
        <h2>Query</h2>
        <textarea :value="getQuery" readonly class="query-textarea"></textarea>
      </div>
    </div>
    <div class="filter-type-container">
      <label for="filterType">Filter:</label>
      <select v-model="filterType" id="filterType">
        <option value="isOn">is on</option>
        <option value="isNotOn">is not on</option>
      </select>
    </div>
    <div class="button-container">
      <button @click="applyFilters">Apply</button>
      <router-link to="/participants">Cancel</router-link>
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
}

.filters-container {
  width: 30%;
  height: 550px;
  padding: 20px;
  background-color: #F6F8FA;
  border-radius: 8px;
}

.filters-container h2 {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 27px;
  font-weight: 550;
  
  margin-bottom: 15px;
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
  margin-left: 5px;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.condition-label {
  flex-grow: 1;
  font-size: 18px;
  color: #354770;
}

.checkbox {
  width: 18px;
  height: 18px;
  margin-right: 120px;
  margin-left: 100px;
  border-radius: 1px;
  border: #354770 1px solid;
}

.dropdown {
  width: 180px;
  height: 26px;
  margin-right: 40px;
  margin-left: 50px;
  border: #354770 solid 2px;
  border-radius: 5px;
  color: #354770;
}

.query-container {
  width: 68%;
  padding: 20px;
  background-color: #F6F8FA;
  border-radius: 8px;
}

.query-container h2 {
  color: #354770;
  font-family: 'Montserrat', sans-serif;
  font-size: 27px;
  font-weight: 550;
  
  margin-bottom: 15px;
}

.query-textarea {
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px;
  font-family: monospace;
  border: 1px solid #F6F8FA;
  background-color: #F6F8FA;
  border-radius: 4px;
  font-family: Montserrat;
  font-size: 18px;
  color: #354770;
}

.filter-type-container {
  margin-bottom: 20px;
}

.button-container {
  display: flex;
}

.button-container button,
.button-container a {
  padding: 10px 20px;
  margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.button-container button {
  background-color: #6196f5;
  color: #fff;
  border: none;
}

.button-container a {
  background-color: #f5f5f5;
  color: #333;
  text-decoration: none;
  border: 1px solid #ccc;
}
</style>